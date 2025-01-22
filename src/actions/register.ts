"use server";
import { sendVerificationEmail } from "@/data/mail";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

//added valçidation schema here
export async function register(values: any) {
  console.log(values);

  const { email, password } = values;

  const pwd = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) return { error: "Email exist" };

  await db.user.create({
    data: {
      email,
      passwordHash: pwd,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { succes: "Confirmation email send!" };
}
