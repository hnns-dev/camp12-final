import Back from "@/components/back";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import ResponseInteraction from "@/components/ResponseInteraction";
import TagsBadges from "@/components/TagsBadges";
import AvatarList from "@/components/AvatarList";

export default async function Response({
  params,
}: {
  params: { responseId: string };
}) {
  return (
    <div className="h-screen flex flex-col items-center bg-white relative">
      <Back />
      <img
        className="w-screen object-cover h-2/5"
        src="../signin-hero.jpg"
        alt="Person sitting on a ping pong table"
      />
      <main className="absolute top-[33%] left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-lg overflow-y-auto justify-between flex flex-col py-5">
        <section className="absolute, ">
          <div className="flex flex-col gap-4 px-5">
            <div className="flex  justify-between">
              <h1 className="text-xl font-semibold">Ping Pong Palooza</h1>
            </div>
            <div className="flex gap-1">
              <LuMapPin className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Knochenpark, Leipzig
              </p>
            </div>
            <div className="flex gap-1">
              <LuCalendarDays className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Thu 05 Sep 2024 - 18:00
              </p>
            </div>
            <div>
              <p className="underline">Meet Details</p>
            </div>
            <div>
              <p className="font-semibold text-s pt-8">Other Players</p>
            </div>
          </div>
          <AvatarList />
          <TagsBadges />
        </section>
        <ResponseInteraction />
      </main>
    </div>
  );
}
