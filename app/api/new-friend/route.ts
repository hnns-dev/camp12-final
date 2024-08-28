import { NextRequest, NextResponse } from 'next/server';
import { addFriend } from '@/lib/utils/add-friend'
import { redirect } from 'next/navigation';


export async function GET(req: NextRequest) {
  const userIdOne = req.nextUrl.searchParams.get("user-one") as string
  const userIdTwo = req.nextUrl.searchParams.get("user-two") as string
  try {
    // Call the addFriend function to add a friend
    await addFriend(userIdOne, userIdTwo);
        
    // redirect("/profile")
    return NextResponse.json({ message: 'Added successfully to friends list' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add into friends list' }, { status: 500 });
  }
}
