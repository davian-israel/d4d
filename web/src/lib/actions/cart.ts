"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart";

export async function addToCartForm(formData: FormData): Promise<void> {
  const productId = String(formData.get("productId") ?? "");
  const quantity = Math.max(1, Number(formData.get("quantity") ?? "1"));
  await addToCart(productId, quantity);
}

export async function addToCart(productId: string, quantity: number) {
  if (quantity < 1) return { ok: false as const, error: "Invalid quantity" };
  const product = await prisma.product.findFirst({ where: { id: productId, published: true } });
  if (!product) return { ok: false as const, error: "Product not found" };

  const cart = await getOrCreateCart();
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
  const nextQuantity = existing ? existing.quantity + quantity : quantity;
  if (nextQuantity > product.stockQuantity) {
    return { ok: false as const, error: "Not enough stock available." };
  }
  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQuantity },
    });
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
  }
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  return { ok: true as const };
}

export async function removeCartItem(itemId: string) {
  const cart = await getOrCreateCart();
  await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
  revalidatePath("/cart");
  revalidatePath("/checkout");
}

export async function removeCartItemForm(formData: FormData) {
  const id = String(formData.get("itemId") ?? "");
  if (!id) return;
  await removeCartItem(id);
}

export async function setCartItemQuantity(itemId: string, quantity: number) {
  if (quantity < 1) return { ok: false as const, error: "Invalid quantity" };
  const cart = await getOrCreateCart();
  const line = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
    include: { product: true },
  });
  if (!line) return { ok: false as const, error: "Item not found" };
  if (quantity > line.product.stockQuantity) {
    return { ok: false as const, error: "Not enough stock available." };
  }
  const updated = await prisma.cartItem.updateMany({
    where: { id: itemId, cartId: cart.id },
    data: { quantity },
  });
  if (updated.count === 0) return { ok: false as const, error: "Item not found" };
  revalidatePath("/cart");
  revalidatePath("/checkout");
  return { ok: true as const };
}
