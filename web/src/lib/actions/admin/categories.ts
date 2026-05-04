"use server";

import { prisma } from "@/lib/prisma";
import { adminCategorySchema } from "@/lib/validation/admin-category";
import { zodFieldErrors } from "@/lib/zod-errors";
import { requireAdmin } from "@/lib/actions/admin/guard";
import { revalidatePath } from "next/cache";

export async function createCategory(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
  };
  const parsed = adminCategorySchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };
  await prisma.category.create({ data: parsed.data });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  return { ok: true as const };
}
