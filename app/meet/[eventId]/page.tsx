import { EditButton } from "@/components/EditButton";
import { ShareInvite } from "@/components/ShareInvite";
import { prisma } from "@/lib/db";
import Back from "@/components/back";
import { FaBasketball } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import TagsBadges from "@/components/TagsBadges";
import AvatarList from "@/components/AvatarList";

const responseId = "123";
const userId = "234";
const creatorId = "234";
const isPublic = false;

export default async function MeetDetail({
  params,
}: {
  params: { eventId: string };
}) {
  const meet = await prisma.meet.findUnique({
    where: { id: params.eventId },
    include: { participants: true },
  });

  if (!meet) {
    throw new Error("Meet not found");
  }

  const { eventId } = params;
  return (
    <div className="h-screen flex flex-col items-center bg-white relative">
      <Back />
      <ShareInvite
        responseId={responseId}
        userId={userId}
        creatorId={creatorId}
        isPublic={isPublic}
      />
      <img
        className="w-screen object-cover h-2/5"
        src="../signin-hero.jpg"
        alt="Person sitting on a ping pong table"
      />
      <main className="absolute top-[33%] left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-lg overflow-y-auto">
        <header className="flex justify-between p-3"></header>
        <section className="absolute, ">
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-2 px-5">
              <FaBasketball className="size-6 fill-orange" />
              <p className="font-medium">Basketball</p>
            </div>
            <div className="flex  justify-between px-5">
              <h1 className="text-xl font-semibold">Ping Pong Palooza</h1>
              <EditButton userId={userId} creatorId={creatorId} />
            </div>
            <div className="flex gap-1 px-5">
              <LuMapPin className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Knochenpark, Leipzig
              </p>
            </div>
            <div className="flex gap-1 px-5">
              <LuCalendarDays className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Thu 05 Sep 2024 - 18:00 (every 2 weeks)
              </p>
            </div>
            <AvatarList />
            <TagsBadges />
            <label htmlFor="description" className="font-semibold px-5 pt-4">
              About the meet
            </label>
            <p className="text-muted-foreground px-5">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax.
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
