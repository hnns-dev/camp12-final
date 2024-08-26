import { EditButton } from "@/components/EditButton";
import { MeetDrawer } from "@/components/ui/meetDrawer";
import { prisma } from "@/lib/db";

const placeHolder = ["Public", "Beginner friendly", "One on One", "1.5 h"];

export default async function MeetDetail({
  params,
}: {
  params: { eventId: string };
}) {
  const tournament = await prisma.tournament.findUnique({
    where: { id: "c9fc91d2-62de-46bb-a61e-abfc55e911bb" },
    include: { participants: true },
  });

  if (!tournament) {
    throw new Error("Tournament not found");
  }

  const { eventId } = params;
  return (
    <main className="h-screen w-screen p-4">
      {/* Header */}
      <EditButton />
      {/* main */}
      <section>
        {/* Hero */}
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl font-bold">Meet</h1>
          <h2 className="text-sm border-solid border-zinc-200 border-2 rounded-xl px-16 py-2">
            Erich Zeigner Allee
          </h2>
          <img
            className="rounded-xl h-2/5 w-full object-fill bg-red-300"
            src="/example.png"
            alt="pic"
          />
          <div className="flex gap-3">
            <button className="bg-zinc-300 text-purple-700 text-xs rounded-full py-1 px-2">
              Show it on the map
            </button>
            <MeetDrawer tournament={tournament} />
          </div>
        </div>
        {/* Tags and Form */}
        <div className="flex flex-col items-stretch justify-center text-center gap-2 py-2 min-h-1/3">
          <h3 className="text-sm border-solid border-zinc-200 border-2 rounded-lg py-2">
            28.08.2024
          </h3>
          <h3 className="text-sm border-solid border-zinc-200 border-2 rounded-lg py-2">
            3:00 PM
          </h3>
          {/* Tags */}
          <ul className="flex flex-row flex-wrap gap-2">
            {placeHolder.map((tag) => (
              <li
                key={tag}
                className="bg-zinc-300 text-black text-xs rounded-md py-1 px-2"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-start text-start gap-2 mt-2">
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <p className="border-zinc-200 border-2 rounded-lg p-2 min-h-20 text-sm">
              You wann have a fun round of table tennis with us? Then join us!
              We play friendly&fair.
            </p>
          </div>
        </div>
      </section>
      {/* Button */}
      <div className="flex flex-col items-stretch flex-grow justify-end mb-14 mt-6">
        <button className="bg-black text-white rounded-l py-4">
          Join Meet
        </button>
      </div>
    </main>
  );
}
