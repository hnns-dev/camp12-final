import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { string } from "zod";
// import { User } from "@prisma/client";

type User = {
  id: string;
  initials: string;
  name: string;
  picture: string | null;
  badges: Badges[];
};

type Badges = {
  name: string;
  icon: string;
};

type Props = {
  user: User;
  friends: User[];
  badges: Badges[];
};

// Hard-coded values
const user = {
  name: "John Doe",
  picture: "/placeholder-user.jpg",
};

const friends = [
  { id: "1", name: "Alice", picture: "/alice.jpg", initials: "A" },
  { id: "2", name: "Bob", picture: null, initials: "B" },
  { id: "3", name: "Charlie", picture: "/charlie.jpg", initials: "C" },
  { id: "4", name: "Diana", picture: null, initials: "D" },
];

const badges = [
  { name: "Early Bird", icon: "/early-bird.svg" },
  { name: "Team Player", icon: "/team-player.svg" },
  { name: "Problem Solver", icon: "/problem-solver.svg" },
  { name: "Innovator", icon: "/innovator.svg" },
];

export default function ProfilePage() {
  return (
    <div>
      <div className=" flex justify-between">
        <Link href={`/qr-add-friend`}>
          <Button
            // onClick={redirectClickHandler}
            variant={"ghost"}
          >
            Add Friends
          </Button>
        </Link>
        <Button variant={"ghost"}>
          <img src="/settings.svg" alt="Settings" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-lg font-medium">{user.name}</div>
        </div>
        <Link href="#" className="group" prefetch={false}>
          <Card className="w-full max-w-md group-hover:bg-zinc-300">
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              {friends.map((friend) => (
                <Avatar key={friend.id} className="w-12 h-12">
                  {friend.picture ? (
                    <AvatarImage src={friend.picture} alt={friend.name} />
                  ) : (
                    <AvatarFallback>{friend.initials}</AvatarFallback>
                  )}
                </Avatar>
              ))}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
        <Link href="#" className="group" prefetch={false}>
          <Card className="w-full max-w-md group-hover:bg-zinc-300">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              {badges.map((badge) => (
                <Avatar key={badge.name} className="w-12 h-12">
                  <AvatarImage src={badge.icon} alt={badge.name} />
                </Avatar>
              ))}
            </CardContent>
            <CardFooter className=""> </CardFooter>
          </Card>
        </Link>
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
