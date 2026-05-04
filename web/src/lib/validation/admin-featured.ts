import { z } from "zod";

export const adminFeaturedSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  sortOrder: z.coerce.number().int().min(0),
});

export type AdminFeaturedInput = z.infer<typeof adminFeaturedSchema>;
