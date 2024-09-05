"use server";
import { MagicLinkTemplate } from "@/emails/magic-link";
import { generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkUserExists(
  email: string
): Promise<{ exists: boolean; name: string | null }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true },
    });

    if (user) {
      return { exists: true, name: user.name };
    } else {
      return { exists: false, name: null };
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw new Error("Failed to check user existence");
  }
}

export const signInWithMagicLink = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const code = generateState();
  const urlString = `http://localhost:3000/api/magic-link/callback?state=${code}&email=${email}`;

  cookies().set("magic-link-state", code);

  // Check if user exists
  const { exists, name } = await checkUserExists(email);

  await resend.emails.send({
    from: "info@dnmct.dev",
    to: email,
    subject: exists ? "Welcome Back to Bounce!" : "Your Magic Link for Bounce",
    react: MagicLinkTemplate({
      urlString,
      name: name || undefined,
      isNewUser: !exists,
    }),
  });

  console.log("email sent");
  redirect("/check-email");
};
