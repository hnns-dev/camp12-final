import Image from "next/image";
import { InteractionBar } from "@/components/InteractionBar";
import { Page } from "./createMeet/page";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Page />
    </main>
  );
}
