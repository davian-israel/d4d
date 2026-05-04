import { z } from "zod";

export const adminProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
  description: z.string().trim().min(1, "Description is required").max(10000),
  priceCents: z.coerce.number().int().positive(),
  currencyCode: z.enum(["CAD", "USD"]).default("CAD"),
  stockQuantity: z.coerce.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  published: z.boolean().optional().default(true),
});

export const adminProductUpdateSchema = adminProductSchema.extend({
  id: z.string().min(1, "Product id is required"),
});

export type AdminProductInput = z.infer<typeof adminProductSchema>;
export type AdminProductUpdateInput = z.infer<typeof adminProductUpdateSchema>;

export const adminProductDeleteSchema = z.object({
  id: z.string().min(1, "Product id is required"),
});
