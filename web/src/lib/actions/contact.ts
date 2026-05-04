"use server";

import { contactSchema } from "@/lib/validation/contact";
import { zodFieldErrors } from "@/lib/zod-errors";
import { prisma } from "@/lib/prisma";

export async function submitContact(_prev: unknown, formData: FormData) {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, fieldErrors: zodFieldErrors(parsed.error) };
  }
  await prisma.contactSubmission.create({ data: parsed.data });
  return { ok: true as const };
}
