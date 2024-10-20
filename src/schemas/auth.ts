import { z } from "zod";

const passwordRegex = /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
const authFactorKey = /^[A-Z0-9]{5}-[A-Z0-9]{5}$/;

export const signInSchema = z.object({
  identifier: z.string().trim().min(3, "invalid identifier"),
  password: z.string().regex(passwordRegex, "invalid password"),
  authFactorToken: z.string().optional(),
});

export type AuthFormData = z.infer<typeof signInSchema>;
