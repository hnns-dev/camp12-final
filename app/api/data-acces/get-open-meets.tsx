import { prisma } from "@/lib/db";

export async function getOpenMeets() {
  const openMeets = await prisma.meet.findMany({
    include: {
      activityType: true,
    },
    where: {
      venueId: null,
      Venue: null,
    },
  });
  return openMeets;
}

export type GetOpenMeetsResult = Awaited<ReturnType<typeof getOpenMeets>>;
