import { prisma } from "@/lib/db";
import MeetForm from "./meet";
import { protectPage } from "@/lib/auth";

export default async function CreateMeet() {
  const user = await protectPage();
  const venue = await prisma.venue.findUnique({
    where: {
      name: "Mussel Gym"
    }
  })

  return (
    <div>
      {/* <TournamentPage /> */}
      <MeetForm userId={user.id} venueId={venue?.id} />
    </div>
  );
}
