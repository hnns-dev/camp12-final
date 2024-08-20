import { InteractionBar } from "@/components/InteractionBar";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Map />
      {/* <div className="bg-red-300 w-screen h-screen-without-bar"></div> */}
      <InteractionBar />
    </main>
  );
}
