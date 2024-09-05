import { prisma } from "@/lib/db";

export async function getCurrentFreeMeets() {
const currentFreeMeets = await prisma.meet.findMany({
  where: {
    meet.venue: null,
    time
  },
});
return currentFreeMeets;

}
