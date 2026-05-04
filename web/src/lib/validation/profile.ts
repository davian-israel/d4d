import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
});

export type ProfileInput = z.infer<typeof profileSchema>;
