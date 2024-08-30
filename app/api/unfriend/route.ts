import { NextRequest, NextResponse } from "next/server";
import { removeFriend } from "@/lib/utils/remove-friend";

export async function GET(req: NextRequest) {
  const userIdOne = req.nextUrl.searchParams.get("user-one") as string;
  const userIdTwo = req.nextUrl.searchParams.get("user-two") as string;

  try {
    // Call the removeFriend function to remove a friend
    await removeFriend(userIdOne, userIdTwo);

    // Redirect to another page after removing a friend
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/profile",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove the user from friends list" },
      { status: 500 }
    );
  }
}
