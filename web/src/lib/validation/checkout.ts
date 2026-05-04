import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  lineItems: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Cart cannot be empty"),
  sourceId: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
