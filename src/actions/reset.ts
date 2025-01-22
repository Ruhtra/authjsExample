"use server";

import { z } from "zod";

import { getUserByEmail } from "@/lib/user";
import { ResetSchema } from "@/schemas/LoginSchema";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/data/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFieldds = ResetSchema.safeParse(values);

  if (!validatedFieldds.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFieldds.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email send!" };
};
