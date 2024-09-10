"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, CalendarDays } from "lucide-react";
import { removeFriend } from "@/actions/friends"; // Import the server action
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import Link from "next/link";

interface FriendCardProps {
  user: User;
  myUserId: string | null;
}

export function FriendCard({ user, myUserId }: FriendCardProps) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  return (
    <div className="relative shadow-md border border-gray-200 rounded-md bg-background text-foreground">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex row">
            <Link href={`/profile/${user.id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.picture ?? ""}
                  alt={user.name ?? ""}
                  className="object-cover"
                />
                <AvatarFallback>
                  {user.name ? user.name.slice(0, 2).toUpperCase() : "NP"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="pl-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground pt-1 pb-1">
                {/* {location} */}
                Leipzig
              </p>
              <div className="flex row">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p className="pl-1 text-xs text-muted-foreground">
                  Friends since August 2024
                </p>
              </div>
            </div>
          </div>

          {userId === myUserId ? (
            <Button
              variant="ghost"
              size="icon"
              className="top-2 right-2 text-destructive hover:bg-transparent"
              onClick={() => removeFriend(myUserId, user.id)} // Attach the click handler
              disabled={loading} // Disable button while loading
            >
              <div className="absolute top-3 right-3 border p-2 rounded-md">
                <Trash2 className="h-4 w-4" />
              </div>
            </Button>
          ) : null}
        </div>

        {/* Conditionally render the response message */}
        {responseMessage && (
          <p
            className={`mt-2 text-sm ${
              responseMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
