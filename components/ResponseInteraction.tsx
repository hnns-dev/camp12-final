"use client";
import { addGuest } from "@/actions/response";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
interface ResponseInteractionProps {
  meetId: string;
}

export default function ResponseInteraction({ meetId }: ResponseInteractionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [guestName, setGuestName] = useState("");

  const handleAccept = async () => {
    console.log("handleAccept", guestName);
    setIsLoading(true);
    try {
      const result = await addGuest(meetId, guestName);
      if (result?.success) {
        router.push(`/meet/${meetId}`);
      } else {
        console.error(result?.error);
      }
    } catch (error) {
      console.error("Failed to add participant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full justify-center px-5 pb-5">
      <Input
        className=" mt-10"
        placeholder="Your Name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />

      <div className="flex gap-5 mt-5">
        <Button
          variant="destructive"
          className="flex-grow"
          onClick={handleDecline}
          disabled={isLoading}
        >
          Decline
        </Button>
        <Button
          variant="default"
          className="flex-grow"
          //disabled={isLoading || (!userId && !participantName.trim())}
          onClick={handleAccept}
        >
          {isLoading ? "Adding..." : "Accept"}
        </Button>
      </div>
    </div>
  );
}
