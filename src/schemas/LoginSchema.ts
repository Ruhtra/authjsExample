import { z } from "zod";

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z.object({
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
