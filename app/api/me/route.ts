import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return redirect("/login");
  }

  try {
    const { user } = await lucia.validateSession(sessionId);

    if (!user) {
      // Invalid session
      return redirect("/login");
    }

    // Fetch additional user data from Prisma
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        settings: true,
        badges: true,
      },
    });

    if (!userData) {
      // User not found in database
      return redirect("/login");
    }

    // Redirect to the user's profile page
    return redirect(`/profile/${userData.id}`);
  } catch (error) {
    console.error("Error validating session:", error);
    return redirect("/login");
  }
}
