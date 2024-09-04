"use server";
import { MagicLinkTemplate } from "@/emails/magic-link";
import { generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export const signInWithMagicLink = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const code = generateState();
  const url = new URL(
    `http://localhost:3000/api/magic-link/callback?state=${code}&email=${email}`
  );

  cookies().set("magic-link-state", code);

  await resend.emails.send({
    from: "info@dnmct.dev",
    to: email,
    subject: "Your Magic Link",
    react: MagicLinkTemplate({ url }),
  });

  console.log("email sent");
  redirect("/check-email");
};
