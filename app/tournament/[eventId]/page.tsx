import { EditButton } from "@/components/EditButton";

const placeHolder = [
  "Public",
  "Pros only",
  "One on One",
  "4h",
  "16 players",
  "knockout",
];

export default function TournamentDetail({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;
  return (
    <main className="h-screen w-screen p-4">
      <EditButton creatorId={""} userId={""} />
      {/* Header */}
      <div className="flex flex-row justify-end pb-8 w-full h-6"></div>
      {/* main */}
      <section>
        {/* Hero */}
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl font-bold">Tournament</h1>
          <h2 className="text-sm border-solid border-zinc-200 border-2 rounded-xl px-16 py-2">
            Erich Zeigner Allee
          </h2>
          <img
            className="rounded-xl h-2/5 w-full object-fill bg-red-300"
            src="/example.png"
            alt="pic"
          />
          <button className="bg-zinc-300 text-purple-700 text-xs rounded-full w-1/3 py-1">
            Show it on the map
          </button>
        </div>
        {/* Tags and Form */}
        <div className="flex flex-col items-stretch justify-center text-center gap-2 py-2 min-h-1/3">
          <h3 className="text-sm border-solid border-zinc-200 border-2 rounded-lg py-2">
            29.08.2024
          </h3>
          <h3 className="text-sm border-solid border-zinc-200 border-2 rounded-lg py-2">
            16:00
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
              You wanna be the very best? Then join our ultimate tournament!
            </p>
          </div>
        </div>
      </section>
      {/* Button */}
      <div className="flex flex-col items-stretch flex-grow justify-end mb-14 mt-6">
        <button className="bg-black text-white rounded-l py-4">
          Join Tournament
        </button>
      </div>
    </main>
  );
}
