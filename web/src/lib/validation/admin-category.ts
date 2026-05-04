import { z } from "zod";

export const adminCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
});

export type AdminCategoryInput = z.infer<typeof adminCategorySchema>;
