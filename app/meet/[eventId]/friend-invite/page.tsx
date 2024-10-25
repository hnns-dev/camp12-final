import { inviteToMeet } from "@/actions/meet";
import { FriendsList } from "@/components/FriendsList";

import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { log } from "console";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function InviteFriendsPage({
  params,
}: {
  params: { userId: string; eventId: string };
}) {
  const { user } = await validateRequest();
  const userFriends = await prisma.user.findMany({
    where: { id: params.userId },
    include: {
      friends: true,
    },
  });

  if (!userFriends?.length)
    return (
      <div className="flex flex-col items-center justify-center p-10 m-5 g-5">
        <div className="mb-4 self-start">
          <Link href="/profile/me">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
        <p className="font-bold text-xl text-center">
          No friends yet, add some friends by sharing your QR-Code:
        </p>
        <Link href={`/`} className="m-5 p-10">
          <Button>Generate QR-Code</Button>
        </Link>
        <img
          className="w-screen flex-1 object-cover object-left p-5 mt-10"
          src="/signin-hero.jpg"
          alt="Person sitting on a ping pong table"
        />
      </div>
    );

  const userMails = userFriends.map((friend) => friend.email);
  console.log(userMails);

  return (
    <div className="flex justify-center flex-col max-w-md mx-auto bg-background text-foreground">
      <div className="flex items-center pt-5 pb-2 pl-2 pr-2">
        <Button variant="ghost" size="icon" className="mr-2 ">
          <Link href={`/profile/${user?.id}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-sm font-normal flex-grow text-center pr-8">
          Friends
        </h1>
        <div className="h-5 w-5"></div>
      </div>

      <FriendsList user={user} friends={userFriends} meetId={params.eventId} />
    </div>
  );
}
