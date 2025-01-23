"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/data/mail";

//ADDED VALIDATION WITH SCHEMA HERE
export async function login(values: any) {
  console.log(values);

  const { email, password } = values;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.passwordHash)
    return { error: "Email does not exist!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login Successfull, redirecting..." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
}
