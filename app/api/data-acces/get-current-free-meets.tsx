import { prisma } from "@/lib/db";

export async function getCurrentFreeMeets() {
  const currentFreeMeets = await prisma.meet.findMany({
    where: {
      // location: {
      //   isNot: null,
      // },
      venueId: null,
      Venue: null,
    },
  });
  return currentFreeMeets;
}
