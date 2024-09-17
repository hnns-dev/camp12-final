// app/meet/[meetId]/page.tsx
import { getMeetData } from "@/actions/meet";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { EditButton } from "@/components/EditButton";
import { ShareInvite } from "@/components/ShareInvite";
import Back from "@/components/Back";
import { FaBasketball } from "react-icons/fa6";
import { LuMapPin, LuCalendarDays } from "react-icons/lu";
import TagsBadges from "@/components/TagsBadges";
import AvatarList from "@/components/AvatarList";
import { formatDate } from "@/lib/utils/formatDate";

export default async function MeetDetailPage({
  params,
}: {
  params: { meetId: string };
}) {
  console.log("Rendering MeetDetailPage with meetId:", params.meetId);

  if (!params.meetId) {
    console.error("No meetId provided");
    return <div>Meet ID is missing</div>;
  }

  try {
    const meetData = await getMeetData(params.meetId);
    console.log(
      "Meet data in page component:",
      JSON.stringify(meetData, null, 2)
    );

    if (!meetData) {
      console.log("No meet data found");
      return <div>Meet not found</div>;
    }

    // Get the current user's session
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id || "";

    const isParticipating = meetData.participants.some(
      (p) => p.id === currentUserId
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
                people={meetData.participants}
                type="participants"
                meetId={meetData.id}
              />
              <TagsBadges tags={meetData.tags} />
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
              // Note: This button won't work as-is in a server component. You'll need to implement this functionality differently.
              disabled={isParticipating}
            >
              {isParticipating ? "Participating" : "Participate"}
            </button>
            <p className="text-center mt-2">
              {meetData.participants.length} participant
              {meetData.participants.length !== 1 ? "s" : ""}
            </p>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error in MeetDetailPage:", error);
    return <div>An error occurred while loading the meet details</div>;
  }
}
