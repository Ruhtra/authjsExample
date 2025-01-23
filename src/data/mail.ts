import { Resend } from "resend";
// import { EmailTemplate } from "./email-template";

const resend = new Resend(process.env.RESENT_API_KEY);

const FROM = "Acme <onboarding@resend.dev>";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: "Confirm your email",
    html: `<p>Yout 2FA code: ${token}</p>`,
    // react: await EmailTemplate({ firstName: "John" }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
    // react: await EmailTemplate({ firstName: "John" }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
    // react: await EmailTemplate({ firstName: "John" }),
  });
};
