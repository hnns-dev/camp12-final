import { NextRequest, NextResponse } from 'next/server';
import { removeFriend } from '@/lib/utils/remove-friend';


export async function GET(req: NextRequest) {
  const userIdOne = req.nextUrl.searchParams.get("user-one") as string
  const userIdTwo = req.nextUrl.searchParams.get("user-two") as string
  try {
    // Call the removeFriend function to remove a friend
    await removeFriend(userIdOne, userIdTwo);
    await removeFriend(userIdTwo, userIdOne);

    return NextResponse.json({ message: 'Removed successfully from friends list' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove the user from friends list' }, { status: 500 });
  }
}
