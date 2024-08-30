// pages/api/auth/login.ts
import { lucia } from "@/lib/auth"; // Import lucia for authentication
import { prisma } from "@/lib/db"; // Import prisma for database interactions
import { cookies } from "next/headers"; // Import cookies to handle sessions
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request/response objects

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Check if the user already exists in the database
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // If the user does not exist, create a new user
    user = await prisma.user.create({
      data: {
        email,
        settings: {
          create: {
            friendsVisibility: "PRIVATE",
            profileVisibility: "PRIVATE",
          },
        },
      },
    });
  }

  // Create a session for the user using Lucia
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  // Set the session cookie
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Respond with a success message or redirect
  return NextResponse.json({ message: "User logged in successfully" });
}
