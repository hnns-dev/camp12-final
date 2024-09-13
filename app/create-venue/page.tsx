import { prisma } from "@/lib/db";
import Link from "next/link";
import CreateVenueForm from "./create-venue-form";

export default async function CreateVenuePage() {
  const activities = await prisma.activityType.findMany({});
  return (
    <main className="m-4">
      <Link href="/" className="text-2xl ml-2">
        ←
      </Link>
      <section className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold">Report about a venue</h1>
        <h2 className="text-base">is there something wrong?</h2>
      </section>
      <section className="flex flex-col ">
        <CreateVenueForm activities={activities} />
      </section>
    </main>
  );
}
