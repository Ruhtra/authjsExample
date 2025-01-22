import { Resend } from "resend";
// import { EmailTemplate } from "./email-template";

const resend = new Resend(process.env.RESENT_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
    // react: await EmailTemplate({ firstName: "John" }),
  });
};
