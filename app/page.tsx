import { InteractionBar } from "@/components/InteractionBar";
import Map from "@/components/map";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Map />
      <InteractionBar />
    </main>
  );
}
