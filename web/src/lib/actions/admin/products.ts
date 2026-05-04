"use server";

import { prisma } from "@/lib/prisma";
import {
  adminProductDeleteSchema,
  adminProductSchema,
  adminProductUpdateSchema,
} from "@/lib/validation/admin-product";
import { zodFieldErrors } from "@/lib/zod-errors";
import { requireAdmin } from "@/lib/actions/admin/guard";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    priceCents: formData.get("priceCents"),
    currencyCode: String(formData.get("currencyCode") ?? "CAD"),
    stockQuantity: formData.get("stockQuantity"),
    categoryId: String(formData.get("categoryId") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    published: formData.get("published") === "on",
  };
  const parsed = adminProductSchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };
  const { imageUrl, ...rest } = parsed.data;
  await prisma.product.create({
    data: {
      ...rest,
      imageUrl: imageUrl || null,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath("/");
  return { ok: true as const };
}

export async function updateProduct(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    id: String(formData.get("id") ?? ""),
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    priceCents: formData.get("priceCents"),
    currencyCode: String(formData.get("currencyCode") ?? "CAD"),
    stockQuantity: formData.get("stockQuantity"),
    categoryId: String(formData.get("categoryId") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    published: formData.get("published") === "on",
  };
  const parsed = adminProductUpdateSchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };

  const { id, imageUrl, ...rest } = parsed.data;
  const existing = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!existing) return { ok: false as const, fieldErrors: { id: "Product not found" } };

  const slugTaken = await prisma.product.findFirst({
    where: { slug: rest.slug, NOT: { id } },
  });
  if (slugTaken) {
    return { ok: false as const, fieldErrors: { slug: "Slug is already in use" } };
  }

  await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      imageUrl: imageUrl || null,
    },
  });

  if (existing.categoryId !== rest.categoryId) {
    const newCat = await prisma.category.findUnique({ where: { id: rest.categoryId } });
    if (newCat) revalidatePath(`/catalog/${newCat.slug}`);
    revalidatePath(`/catalog/${existing.category.slug}`);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${existing.category.slug}`);
  revalidatePath(`/product/${existing.slug}`);
  revalidatePath(`/product/${rest.slug}`);
  revalidatePath("/");
  return { ok: true as const };
}

export async function deleteProduct(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = { id: String(formData.get("id") ?? "") };
  const parsed = adminProductDeleteSchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const, error: "Invalid product" };

  const { id } = parsed.data;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) return { ok: false as const, error: "Product not found" };

  const lineCount = await prisma.orderLine.count({ where: { productId: id } });
  if (lineCount > 0) {
    return {
      ok: false as const,
      error: "Cannot delete: this product appears on historical orders. Unpublish instead.",
    };
  }

  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${product.category.slug}`);
  revalidatePath(`/product/${product.slug}`);
  revalidatePath("/");
  redirect("/admin/products");
}
