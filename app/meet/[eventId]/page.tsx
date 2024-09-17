import { EditButton } from "@/components/EditButton";
import { ShareInvite } from "@/components/ShareInvite";
import { prisma } from "@/lib/db";
import Back from "@/components/Back";
import { FaBasketball } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import TagsBadges from "@/components/TagsBadges";
import AvatarList from "@/components/AvatarList";
import { formatDate } from "@/lib/utils/formatDate";

export default async function MeetDetail({
  params,
}: {
  params: { eventId: string };
}) {
  const meet = await prisma.meet.findUnique({
    where: { id: params.eventId },
    include: {
      participants: true,
      creator: true,
      venue: true,
      activityType: true,
      tags: true,
    },
  });

  if (!meet) {
    throw new Error("Meet not found");
  }

  const { id: eventId, isPublic, creatorId } = meet;
  const userId = "current-user-id"; // Replace with actual user ID from authentication

  return (
    <div className="h-screen flex flex-col items-center bg-white relative">
      <Back />
      <ShareInvite
        responseId={eventId}
        userId={userId}
        creatorId={creatorId}
        isPublic={isPublic}
      />
      <img
        className="w-screen object-cover h-2/5"
        src={meet.venue?.image || "../signin-hero.jpg"}
        alt={meet.venue?.name || "Event venue"}
      />
      <main className="absolute top-[33%] left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-lg overflow-y-auto">
        <header className="flex justify-between p-3"></header>
        <section className="absolute">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 px-5">
              <FaBasketball className="size-6 fill-orange" />
              <p className="font-medium">{meet.activityType.name}</p>
            </div>
            <div className="flex justify-between px-5">
              <h1 className="text-xl font-semibold">
                {meet.activityType.name} Meet
              </h1>
              <EditButton userId={userId} creatorId={creatorId} />
            </div>
            <div className="flex gap-1 px-5">
              <LuMapPin className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {meet.venue?.name || meet.address}, {meet.venue?.address}
              </p>
            </div>
            <div className="flex gap-1 px-5">
              <LuCalendarDays className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {formatDate(meet.date)} - {meet.time}
                {meet.isRecurring && " (recurring)"}
              </p>
            </div>
            <AvatarList participants={meet.participants} />
            <TagsBadges tags={meet.tags} />
            <label htmlFor="description" className="font-semibold px-5 pt-4">
              About the meet
            </label>
            <p className="text-muted-foreground px-5">
              {meet.notes || "No description available."}
            </p>
          </div>
        </section>
        <div className="flex flex-col items-stretch flex-grow justify-end mb-14 mt-6 px-5">
          <button className="bg-slate-900 font-medium text-white rounded-lg py-4">
            Participate
          </button>
        </div>
      </main>
    </div>
  );
}
