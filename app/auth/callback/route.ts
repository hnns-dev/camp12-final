import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get user details from the OAuth provider
    const { email, name } = await getOAuthUserDetails(req);

    // Step 2: Check if the user already exists in the database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Step 3: If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    // Inside your OAuth callback route
    const session = await prisma.session.create({
      data: {
        id: uuidv4(), // Generate a UUID for the session ID
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
      },
    });

    // Step 5: Generate a session token (JWT)
    const token = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    // Step 6: Set the session token in a cookie
    setCookie({ res: NextResponse.next() }, "session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    // Step 7: Redirect the user to the homepage or a dashboard
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Replace this mock function with your actual OAuth handling logic
async function getOAuthUserDetails(req: NextRequest) {
  // Implement logic to extract user details from OAuth provider response
  return {
    email: "example@domain.com",
    name: "John Doe",
  };
}
