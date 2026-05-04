import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const CART_COOKIE = "cart_session";

const cartInclude = {
  items: { include: { product: { include: { category: true } } } },
} as const;

function isUniqueViolation(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";
}

/** Quantities already in the current session cart, keyed by product id. */
export async function getCartQuantityByProductId(): Promise<Record<string, number>> {
  const cart = await getOrCreateCart();
  const map: Record<string, number> = {};
  for (const item of cart.items) {
    map[item.productId] = (map[item.productId] ?? 0) + item.quantity;
  }
  return map;
}

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get(CART_COOKIE)?.value;
  if (!sessionKey) {
    throw new Error("Missing cart_session cookie; middleware should create it.");
  }

  const existing = await prisma.cart.findUnique({
    where: { sessionKey },
    include: cartInclude,
  });
  if (existing) return existing;

  try {
    return await prisma.cart.create({
      data: { sessionKey },
      include: cartInclude,
    });
  } catch (e) {
    if (!isUniqueViolation(e)) throw e;
    return prisma.cart.findUniqueOrThrow({
      where: { sessionKey },
      include: cartInclude,
    });
  }
}
