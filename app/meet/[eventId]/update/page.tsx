import MeetForm from "@/app/create/meet";
import { prisma } from "@/lib/db";

export default async function UpdateMeetPage({
  params,
}: {
  params: { eventId: string };
}) {
  console.log(params.eventId);

  const meet = await prisma.meet.findUnique({
    where: { id: params.eventId },
  });
  console.log(meet);

  return <MeetForm meet={meet} />;
}
