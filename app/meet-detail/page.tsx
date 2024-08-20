const placeHolder = ["Public", "Beginner friendly", "One on One", "1.5 h"];

export default function MeetDetail() {
  return (
    <main className="h-screen w-screen p-4">
      {/* Header */}
      <div className="flex flex-row justify-end pb-8 w-full h-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 2L22 6"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 20.5L19 9L15 5L3.5 16.5L2 22L7.5 20.5Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
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
            src="example.png"
            alt="pic"
          />
          <button className="bg-zinc-300 text-purple-700 text-xs rounded-full w-1/3 py-1">
            Show it on the map
          </button>
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
          <form
            action="input"
            className="flex flex-col justify-start text-start gap-2 mt-2"
          >
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border-zinc-200 border-2 rounded-lg p-2 min-h-20 text-sm"
              placeholder="Type your message here"
              rows={4}
            />
          </form>
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
