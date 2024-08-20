import Image from "next/image";
import { InteractionBar } from "@/components/InteractionBar";
import Navbar from "@/components/Navbar";
import { Form } from "@/components/ui/form";
import { ProfileForm } from "@/components/profile-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <InteractionBar />
      <ProfileForm />
      <Navbar />
    </main>
  );
}
