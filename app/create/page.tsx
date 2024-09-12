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
        isPublic={false}
        creatorId={user.id}
        guests={0}
        venueId={"cac656e2-3565-4387-9e03-cb80ab885a16"}
        tagSuggestions={tags}
      />
    </div>
  );
}
