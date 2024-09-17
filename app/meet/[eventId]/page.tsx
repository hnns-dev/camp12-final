"use client";

import { useState, useEffect } from "react";
import { EditButton } from "@/components/EditButton";
import { ShareInvite } from "@/components/ShareInvite";
import Back from "@/components/Back";
import { FaBasketball } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import TagsBadges from "@/components/TagsBadges";
import AvatarList from "@/components/AvatarList";
import { formatDate } from "@/lib/utils/formatDate";
import { addParticipant } from "@/actions/response";

// Define types
type Participant = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
};

type Tag = {
  name: string;
};

type MeetData = {
  id: string;
  creatorId: string;
  isPublic: boolean;
  venue?: {
    name?: string;
    image?: string;
    address?: string;
  };
  activityType?: {
    name: string;
  };
  date?: Date;
  time?: string;
  isRecurring?: boolean;
  notes?: string;
  tags: string[] | Tag[];
  participants: Participant[];
};

export default function MeetDetail({
  meetData,
  currentUserId,
}: {
  meetData: MeetData | null;
  currentUserId: string;
}) {
  const [isParticipating, setIsParticipating] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (meetData && meetData.participants) {
      setParticipants(meetData.participants);
      setIsParticipating(
        meetData.participants.some((p) => p.id === currentUserId)
      );
    }
  }, [meetData, currentUserId]);

  const handleParticipate = async () => {
    if (!meetData) return;

    try {
      const result = await addParticipant(meetData.id, currentUserId);
      if (result.success && result.participants) {
        setIsParticipating(true);
        setParticipants(result.participants);
      } else {
        console.error("Failed to participate:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!meetData) {
    return <div>Loading...</div>;
  }

  // Convert tags to the correct format if they're strings
  const formattedTags: Tag[] = meetData.tags.map((tag) =>
    typeof tag === "string" ? { name: tag } : tag
  );

  return (
    <div className="h-screen flex flex-col items-center bg-white relative">
      <Back />
      <ShareInvite
        responseId={meetData.id}
        userId={currentUserId}
        creatorId={meetData.creatorId}
        isPublic={meetData.isPublic}
      />
      <img
        className="w-screen object-cover h-2/5"
        src={meetData.venue?.image || "../signin-hero.jpg"}
        alt={meetData.venue?.name || "Event venue"}
      />
      <main className="absolute top-[33%] left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-lg overflow-y-auto">
        <header className="flex justify-between p-3"></header>
        <section className="absolute w-full">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 px-5">
              <FaBasketball className="size-6 fill-orange" />
              <p className="font-medium">
                {meetData.activityType?.name || "Activity"}
              </p>
            </div>
            <div className="flex justify-between px-5">
              <h1 className="text-xl font-semibold">
                {meetData.activityType?.name || "Meet"}
              </h1>
              <EditButton
                userId={currentUserId}
                creatorId={meetData.creatorId}
              />
            </div>
            <div className="flex gap-1 px-5">
              <LuMapPin className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {meetData.venue?.name ||
                  meetData.venue?.address ||
                  "Location not specified"}
              </p>
            </div>
            <div className="flex gap-1 px-5">
              <LuCalendarDays className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {meetData.date
                  ? formatDate(meetData.date)
                  : "Date not specified"}{" "}
                - {meetData.time || "Time not specified"}
                {meetData.isRecurring && " (recurring)"}
              </p>
            </div>
            <AvatarList
              people={participants}
              type="participants"
              meetId={meetData.id}
            />
            <TagsBadges tags={formattedTags} />
            <label htmlFor="description" className="font-semibold px-5 pt-4">
              About the meet
            </label>
            <p className="text-muted-foreground px-5">
              {meetData.notes || "No description available."}
            </p>
          </div>
        </section>
        <div className="flex flex-col items-stretch flex-grow justify-end mb-14 mt-6 px-5">
          <button
            className={`font-medium text-white rounded-lg py-4 ${
              isParticipating ? "bg-green-500" : "bg-slate-900"
            }`}
            onClick={handleParticipate}
            disabled={isParticipating}
          >
            {isParticipating ? "Participating" : "Participate"}
          </button>
          <p className="text-center mt-2">
            {participants.length} participant
            {participants.length !== 1 ? "s" : ""}
          </p>
        </div>
      </main>
    </div>
  );
}
