"use client";
import { FaShareAlt } from "react-icons/fa";
import { RWebShare } from "react-web-share";

export function ShareInvite({ responseId }: { responseId: string }) {
  return (
    <div className={``}>
      <RWebShare
        data={{
          text: "You got invited to play!",
          url: `http://localhost:3000/response-page/${responseId}`,
          title: "Invite",
        }}
      >
        <FaShareAlt className="w-6 h-6" />
      </RWebShare>
    </div>
  );
}
