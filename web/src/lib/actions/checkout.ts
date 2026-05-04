"use server";

import { auth } from "@/auth";
import { checkoutSchema } from "@/lib/validation/checkout";
import { zodFieldErrors } from "@/lib/zod-errors";
import { prisma } from "@/lib/prisma";
import { logStructured } from "@/lib/logger";
import { randomUUID } from "crypto";
import { getOrCreateCart } from "@/lib/cart";
import { isMockCheckoutAllowed, isVercelProduction, mustUseSquareToken } from "@/lib/payments-policy";

async function createSquarePayment(params: {
  sourceId: string;
  idempotencyKey: string;
  totalCents: number;
  locationId: string;
  email: string;
}): Promise<{ ok: boolean; paymentId?: string; status?: string }> {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) return { ok: false };
  const base =
    process.env.SQUARE_ENV === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";
  const res = await fetch(`${base}/v2/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Square-Version": "2024-10-17",
    },
    body: JSON.stringify({
      idempotency_key: params.idempotencyKey,
      source_id: params.sourceId,
      amount_money: { amount: params.totalCents, currency: "USD" },
      location_id: params.locationId,
      buyer_email_address: params.email,
    }),
  });
  const json = (await res.json()) as {
    payment?: { id?: string; status?: string };
    errors?: unknown;
  };
  if (!res.ok) {
    logStructured("error", "checkout.square_http_error", {
      status: res.status,
      errors: json.errors,
    });
    return { ok: false };
  }
  const paymentId = json.payment?.id;
  const status = json.payment?.status;
  return { ok: true, paymentId, status };
}

export async function completeCheckout(payload: unknown) {
  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };
  }

  const { email, lineItems, sourceId } = parsed.data;
  const session = await auth();

  if (isVercelProduction()) {
    if (process.env.MOCK_PAYMENTS === "true") {
      return {
        ok: false as const,
        error: "Mock payments are disabled on Vercel Production.",
      };
    }
    if (!sourceId) {
      return { ok: false as const, error: "Card payment is required to complete checkout." };
    }
    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      return { ok: false as const, error: "Payments are not configured." };
    }
  } else if (mustUseSquareToken() && !sourceId) {
    return {
      ok: false as const,
      error: "Enter card details or enable MOCK_PAYMENTS for local testing.",
    };
  }

  const products = await prisma.product.findMany({
    where: { id: { in: lineItems.map((l) => l.productId) }, published: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  let subtotal = 0;
  const resolvedLines: {
    productId: string;
    quantity: number;
    unitPriceCents: number;
    nameSnapshot: string;
  }[] = [];

  for (const line of lineItems) {
    const p = byId.get(line.productId);
    if (!p) {
      return { ok: false as const, error: "Invalid product in cart" };
    }
    if (p.stockQuantity < line.quantity) {
      return { ok: false as const, error: "Not enough stock for one or more items." };
    }
    subtotal += p.priceCents * line.quantity;
    resolvedLines.push({
      productId: p.id,
      quantity: line.quantity,
      unitPriceCents: p.priceCents,
      nameSnapshot: p.name,
    });
  }

  const taxCents = 0;
  const totalCents = subtotal + taxCents;
  const idempotencyKey = randomUUID();

  const mock = isMockCheckoutAllowed() && !sourceId;

  let squarePaymentId: string | null = null;
  let paymentOk = false;

  if (mock) {
    squarePaymentId = `mock_${idempotencyKey}`;
    paymentOk = true;
    logStructured("info", "checkout.mock_payment", { idempotencyKey });
  } else {
    const squareSourceId = sourceId;
    if (!squareSourceId) {
      return { ok: false as const, error: "Card payment is required to complete checkout." };
    }
    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!locationId) {
      return { ok: false as const, error: "Square location missing" };
    }
    const pay = await createSquarePayment({
      sourceId: squareSourceId,
      idempotencyKey,
      totalCents,
      locationId,
      email,
    });
    if (pay.ok && pay.paymentId) {
      squarePaymentId = pay.paymentId;
      paymentOk = pay.status === "COMPLETED" || pay.status === "APPROVED";
    }
  }

  if (!paymentOk) {
    const order = await prisma.order.create({
      data: {
        email,
        userId: session?.user?.id,
        subtotalCents: subtotal,
        taxCents,
        totalCents,
        idempotencyKey,
        squarePaymentId,
        status: "FAILED",
        paymentStatus: "FAILED",
        lines: { create: resolvedLines },
      },
    });
    return {
      ok: false as const,
      error: "Payment declined or failed. You can try again from your cart.",
      orderId: order.id,
    };
  }

  const cart = await getOrCreateCart();

  try {
    const order = await prisma.$transaction(async (tx) => {
      const o = await tx.order.create({
        data: {
          email,
          userId: session?.user?.id,
          subtotalCents: subtotal,
          taxCents,
          totalCents,
          idempotencyKey,
          squarePaymentId,
          status: "PAID",
          paymentStatus: "COMPLETED",
          lines: { create: resolvedLines },
        },
      });

      for (const line of resolvedLines) {
        const dec = await tx.product.updateMany({
          where: { id: line.productId, stockQuantity: { gte: line.quantity } },
          data: { stockQuantity: { decrement: line.quantity } },
        });
        if (dec.count !== 1) {
          throw new Error("stock_conflict");
        }
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return o;
    });

    return {
      ok: true as const,
      orderId: order.id,
      mock,
    };
  } catch {
    return {
      ok: false as const,
      error: "Could not complete order due to inventory. Please refresh and try again.",
    };
  }
}
