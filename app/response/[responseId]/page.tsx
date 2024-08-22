import { Name } from "@/components/name";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function responsePage({
  params,
}: {
  params: { responseId: string };
}) {
  const { responseId } = params;
  const placeHolder = [
    "Public",
    "Pros only",
    "One on One",
    "4h",
    "16 players",
    "knockout",
  ];

  const eventName = "Tournament";
  const adress = " Erich Zeigner Allee";
  const date = "29.08.2024";
  const time = "16:00";
  const sessionId = "345";

  return (
    <main className="h-screen w-screen p-4">
      {/* Header */}
      <h1 className="text-center font-bold">
        JeanLuc1312 has invited you to a:
      </h1>

      <div className="flex flex-row justify-end pb-8 w-full h-6"></div>
      {/* main */}
      <section>
        {/* Hero */}
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h2 className="text-4xl font-bold">{eventName}</h2>
          <h3 className="text-sm border-solid border-zinc-200 border-2 rounded-xl px-16 py-2">
            {adress}
          </h3>
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
            {date} - {time}
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
          <Name />
        </div>
        <Link
          href={`/${eventName}-detail/${sessionId}`}
          className="underline flex items-center gap-3"
        >
          <p>{eventName} Details </p>
          <FaArrowRight />
        </Link>
      </section>
      {/* Button */}
      <div className="flex flex-col items-stretch flex-grow justify-end mb-14 mt-6">
        <Button className="bg-black text-white rounded-l py-4">
          Join {eventName}
        </Button>
      </div>
    </main>
  );
}
