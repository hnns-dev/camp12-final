import { prisma } from "@/lib/db";
import MeetForm from "./meet";
import { protectPage } from "@/lib/auth";

export default async function CreateMeet() {
  const user = await protectPage();
  const tags = await prisma.tag.findMany();

  const initialMeetData = await prisma.meet.findFirst({
    where: { creatorId: user.id },
    include: {
      activityType: true,
      venue: true,
    },
  });

  // If there's no existing meet, use default values?
  const meetData = initialMeetData || {
    isPublic: false,
    guests: 0,
    venueId: null,
    activityType: null,
  };

  return (
    <div>
      {/* <TournamentPage /> */}
      <MeetForm
        isPublic={meetData.isPublic}
        creatorId={user.id}
        guests={meetData.guests}
        venueId={meetData.venueId}
        tagSuggestions={tags}
      />
    </div>
  );
}
