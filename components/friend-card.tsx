import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, CalendarDays } from "lucide-react";
import { User } from "@prisma/client";
import Link from "next/link";

interface FriendCardProps {
  user: User;
  myUserId: string | null;
  disableDelete?: boolean;
}

export function FriendCard({
  disableDelete = false,
  myUserId,
  user,
}: FriendCardProps) {
  return (
    <Link href={`/profile/${user.id}`}>
      <div className="relative shadow-md border border-gray-200 rounded-md bg-background text-foreground">
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex row">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.picture ?? ""} alt={user.name ?? ""} />
                <AvatarFallback>
                  {user?.name?.slice(1, 3).toUpperCase() ?? "NP"}
                </AvatarFallback>
              </Avatar>
              <div className="pl-4">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground pt-1 pb-1">
                  Leipzig
                </p>
                <div className="flex row">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <p className="pl-1 text-xs text-muted-foreground">
                    Friends since Septemper 2024
                  </p>
                </div>
              </div>
            </div>
            {!disableDelete ? (
              <Button
                variant="ghost"
                size="icon"
                className="top-2 right-2 text-destructive hover:bg-transparent"
              >
                <div className="absolute top-3 right-3 border p-2 rounded-md">
                  <Trash2 className="h-4 w-4" />
                </div>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
