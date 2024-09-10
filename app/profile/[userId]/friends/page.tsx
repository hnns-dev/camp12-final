import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FriendCard } from "@/components/friend-card";
import { findFriends } from "@/actions/friends";
import { validateRequest } from "@/lib/auth";

export default async function FriendsListPage({
  params,
}: {
  params: { userId: string };
}) {
  const { user } = await validateRequest();
  const friends = await findFriends(params.userId);

  if (!friends?.length) return <p>No friends</p>;

  return (
    <div className="max-w-md mx-auto bg-background text-foreground">
      <div className="flex items-center pt-5 pb-2 pl-2 pr-2">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-sm font-normal flex-grow text-center pr-8">
          Friends
        </h1>
        <div className="h-5 w-5"></div>
      </div>
      <div className="p-4 space-y-4">
        {friends.map((friend, index) => (
          <FriendCard user={friend} myUserId={user?.id ?? null} />
        ))}
      </div>
    </div>
  );
}
