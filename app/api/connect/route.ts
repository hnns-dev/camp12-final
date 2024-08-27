// app/api/add-friend/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addFriend } from "../../../lib/utils/add-friends"


export async function GET(req: NextRequest) {
  const userIdOne = req.nextUrl.searchParams.get("userone") as string
  const userIdTwo = req.nextUrl.searchParams.get("usertwo") as string
  try {
    // Call the service function to add friends
    await addFriend(userIdOne, userIdTwo);
    return NextResponse.json({ message: 'Added successfully to friends list' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add into friends list' }, { status: 500 });
  }
}
