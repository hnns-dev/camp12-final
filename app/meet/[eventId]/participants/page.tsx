import { BackArrow } from "@/components/BackArrow";
import { FriendCard } from "@/components/friend-card";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function ParticipantsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { user } = await validateRequest();
  const meet = await prisma.meet.findUnique({
    where: { id: params.eventId },
    include: { participants: true },
  });
  return (
    <div className="max-w-md mx-auto bg-background text-foreground">
      <div className="flex items-center pt-5 pb-2 pl-2 pr-2">
        <BackArrow />
        <h1 className="text-sm font-normal flex-grow text-center pr-8">
          Participants
        </h1>
        <div className="h-5 w-5"></div>
      </div>
      <div className="p-4 space-y-4">
        {meet?.participants.map((participant) => (
          <FriendCard
            key={participant.id}
            user={participant}
            myUserId={user?.id ?? null}
          />
        ))}
      </div>
    </div>
  );
}
