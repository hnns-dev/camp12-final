import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  return (
    <div>
      <div className="flex justify-between">
        <Link href={`/qr-add-friend`}>
          <Button variant={"ghost"}>Add Friends</Button>
        </Link>
        <Button variant={"ghost"}>
          <img src="/settings.svg" alt="Settings" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user?.picture || "/placeholder-user.jpg"}
              alt="@shadcn"
            />
            <AvatarFallback>{user?.name?.slice(2)}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-lg font-medium">{user?.name}</div>
        </div>

        {user ? <ProfileForm user={user} /> : null}
        {/* Liste der Freunde anzeigen */}
        {/* Hier kannst du auch die Freunde und Abzeichen aus dem Datenbankabruf einfügen */}
      </div>
    </div>
  );
}
