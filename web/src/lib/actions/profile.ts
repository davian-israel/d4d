"use server";

import { auth } from "@/auth";
import { profileSchema } from "@/lib/validation/profile";
import { zodFieldErrors } from "@/lib/zod-errors";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(_prev: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, error: "Unauthorized" };

  const raw = { name: String(formData.get("name") ?? "") };
  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };
  }
  await prisma.user.update({ where: { id: session.user.id }, data: { name: parsed.data.name } });
  revalidatePath("/account");
  return { ok: true as const };
}
