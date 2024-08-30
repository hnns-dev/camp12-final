import { prisma } from "@/lib/db";
import CreateMeet from "./meet";

export default async function UpdateMeet() {
  const tags = await prisma.tag.findMany();
  return (
    <div>
      {/* <TournamentPage /> */}
      <CreateMeet
        isPublic={false}
        creatorId={"as222fkt547eu392"}
        guests={0}
        venueId={"cac656e2-3565-4387-9e03-cb80ab885a16"}
        tagSuggestions={tags}
      />
    </div>
  );
}
