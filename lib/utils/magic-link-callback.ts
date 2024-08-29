// pages/api/magic-link-callback.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession, signIn } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
        },
      });
    }

    // Log the user in and create a session
    const session = await signIn("email", {
      email: user.email,
      redirect: false,
    });

    if (!session) {
      return res.status(500).json({ message: "Failed to create session" });
    }

    res.status(200).json({ message: "Logged in successfully", session });
  } catch (error) {
    console.error("Error handling magic link callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
