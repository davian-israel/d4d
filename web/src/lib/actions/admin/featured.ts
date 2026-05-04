"use server";

import { prisma } from "@/lib/prisma";
import { adminFeaturedSchema } from "@/lib/validation/admin-featured";
import { zodFieldErrors } from "@/lib/zod-errors";
import { requireAdmin } from "@/lib/actions/admin/guard";
import { revalidatePath } from "next/cache";

export async function addFeaturedPlacement(formData: FormData) {
  await requireAdmin();
  const raw = {
    productId: String(formData.get("productId") ?? ""),
    sortOrder: formData.get("sortOrder"),
  };
  const parsed = adminFeaturedSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(Object.values(zodFieldErrors(parsed.error)).join(" "));
  }
  await prisma.featuredPlacement.create({ data: parsed.data });
  revalidatePath("/admin/featured");
  revalidatePath("/");
}

export async function removeFeaturedPlacement(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.featuredPlacement.delete({ where: { id } });
  revalidatePath("/admin/featured");
  revalidatePath("/");
}
