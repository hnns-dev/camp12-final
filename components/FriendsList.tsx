"use client";

import { FriendCard } from "./friend-card";
import { User } from "@prisma/client";
import { User as AuthUser } from "lucia";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { inviteToMeet } from "@/actions/meet";
import { log } from "console";

export function FriendsList({
  user,
  friends,
  meetId,
}: {
  user: AuthUser | null;
  friends: User[];

  meetId: string;
}) {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Current selected friends:", selectedFriends);
  }, [selectedFriends]); // This will run every time `selectedFriends` changes

  const addFriend = (userId: string) =>
    setSelectedFriends((prev) => [...prev, userId]);
  const removeFriend = (userId: string) =>
    setSelectedFriends((prev) => prev.filter((f) => f !== userId));

  const handleInvite = async () => {
    setLoading(true);
    try {
      const userIds = selectedFriends;
      await inviteToMeet(userIds, meetId);
      console.log("Invite sent!");
      alert("Invite Succesful");
      window.location.href = `http://localhost:3000/meet/${meetId}`;
    } catch (error) {
      console.error("Failed to send invite", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {friends.map((friend, index) => (
        <div className="flex p-4 space-y-4">
          <FriendCard
            key={index}
            user={friend}
            myUserId={user?.id ?? null}
            showCheckbox={true}
            checked={selectedFriends.includes(friend.id)}
            onChange={
              selectedFriends.includes(friend.id)
                ? () => removeFriend(friend.id)
                : () => addFriend(friend.id)
            }
          />
        </div>
      ))}

      <div className="flex">
        <Button className="w-64" onClick={handleInvite} disabled={loading}>
          {loading ? "Inviting..." : "Invite Friends"}
        </Button>
      </div>
    </div>
  );
}
