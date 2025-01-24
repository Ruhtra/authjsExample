"use server";

import { sendVerificationEmail } from "@/data/mail";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserById } from "@/lib/user";
import { SettingsSchema } from "@/schemas/LoginSchema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { unstable_update } from "@/auth";

export default async function settings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const exisstingUser = await getUserByEmail(values.email);
    if (exisstingUser && exisstingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.passwordHash) {
    const passwordMatch = bcrypt.compare(values.password, dbUser.passwordHash);
    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const newUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: newUser,
  });

  return { success: "Setting Updated!" };
}
