import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, CalendarDays } from "lucide-react";

interface FriendCardProps {
  username: string;
  picture: string;
  location: string;
  friendsSince: string;
}

export function FriendCard({
  username,
  picture,
  location,
  friendsSince,
}: FriendCardProps) {
  return (
    <div className="relative shadow-md border border-gray-200 rounded-md bg-background text-foreground">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex row">
            <Avatar className="h-10 w-10">
              <AvatarImage src={picture} alt={username} />
              <AvatarFallback>
                {username.slice(1, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="pl-4">
              <p className="font-semibold">{username}</p>
              <p className="text-sm text-muted-foreground pt-1 pb-1">
                {location}
              </p>
              <div className="flex row">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p className="pl-1 text-xs text-muted-foreground">
                  Friends since {friendsSince}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="top-2 right-2 text-destructive hover:bg-transparent"
          >
            <div className="absolute top-3 right-3 border p-2 rounded-md">
              <Trash2 className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
