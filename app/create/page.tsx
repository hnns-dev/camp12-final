import { prisma } from "@/lib/db";
import MeetForm from "./meet";
import { protectPage } from "@/lib/auth";

export default async function CreateMeet() {
  const user = await protectPage();
  const tags = await prisma.tag.findMany();

  return (
    <div>
      {/* <TournamentPage /> */}
      <MeetForm
      // isPublic={meetData.isPublic}
      // creatorId={user.id}
      // guests={meetData.guests}
      // venueId={meetData.venueId}
      // tagSuggestions={tags}
      />
    </div>
  );
}
