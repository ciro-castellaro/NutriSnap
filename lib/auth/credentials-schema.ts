import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = credentialsSchema.extend({
  name: z.string().trim().min(1).max(80),
});
