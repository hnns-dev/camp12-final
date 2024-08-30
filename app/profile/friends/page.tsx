import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FriendCard } from "@/components/friend-card";

type Friend = {
  username: string;
  picture: string;
  location: string;
  friendsSince: string;
};

const friends: Friend[] = [
  {
    username: "@pong-empress",
    picture: "/placeholder.svg?height=40&width=40",
    location: "Leipzig",
    friendsSince: "August 2024",
  },
  {
    username: "@pong-empress",
    picture: "/placeholder.svg?height=40&width=40",
    location: "Leipzig",
    friendsSince: "August 2024",
  },
  {
    username: "@pong-empress",
    picture: "/placeholder.svg?height=40&width=40",
    location: "Leipzig",
    friendsSince: "August 2024",
  },
  {
    username: "@pong-empress",
    picture: "/placeholder.svg?height=40&width=40",
    location: "Leipzig",
    friendsSince: "August 2024",
  },
  {
    username: "@pong-empress",
    picture: "/placeholder.svg?height=40&width=40",
    location: "Leipzig",
    friendsSince: "August 2024",
  },
];

export default function FriendsListPage() {
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
          <FriendCard
            key={index}
            username={friend.username}
            picture={friend.picture}
            location={friend.location}
            friendsSince={friend.friendsSince}
          />
        ))}
      </div>
    </div>
  );
}
