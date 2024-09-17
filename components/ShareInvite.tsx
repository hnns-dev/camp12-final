"use client";
import { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import { LuShare2 } from "react-icons/lu";

type ShareInviteProps = {
  meetId: string;
  isPublic: boolean;
  creatorId: string;
  userId: string;
};

export function ShareInvite({
  meetId,
  isPublic: isPublic,
  creatorId,
  userId,
}: ShareInviteProps) {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(userId === creatorId);
  }, [userId, creatorId]);

  const shouldShowShare = isPublic || (!isPublic && isCreator);

  if (!shouldShowShare) {
    return null;
  }
  return (
    <RWebShare
      data={{
        text: "You got invited to play!",
        url: `http://localhost:3000/response/${meetId}`,
        title: "Invite",
      }}
    >
      <div className="flex w-11 h-11 rounded-xl absolute z-[999] top-4 right-4 p-3 bg-white/80 justify-between items-center">
        <LuShare2 className="size-8" />
      </div>
    </RWebShare>
  );
}
