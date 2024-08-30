"use client";
import { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { RWebShare } from "react-web-share";

type ShareInviteProps = {
  responseId: string;
  isPublic: boolean;
  creatorId: string;
  userId: string;
};

export function ShareInvite({
  responseId,
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
        url: `http://localhost:3000/response-page/${responseId}`,
        title: "Invite",
      }}
    >
      <FaShareAlt className="w-6 h-6" />
    </RWebShare>
  );
}
