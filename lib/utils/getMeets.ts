import { prisma } from "../db";

export async function getUserCreatedMeets(userId?: string) {
  if (!userId) return [];
  const meets = await prisma.meet.findMany({
    where: { creatorId: userId },

    select: {
      id: true,
      venueId: true,
      activityType: true,
      date: true,
      time: true,
      guests: true,
      participants: true,
      Venue: true,
      creatorId: true,
      creator: true,
    },
  });
  return meets;
}

export type UserCreatedMeet = Awaited<
  ReturnType<typeof getUserCreatedMeets>
>[number];

export async function getUserParticipatingMeets(userId?: string) {
  if (!userId) return [];
  const meets = await prisma.meet.findMany({
    where: { participants: { some: { id: userId } } },
    select: {
      id: true,
      venueId: true,
      activityType: true,
      date: true,
      time: true,
      guests: true,
      participants: true,
      Venue: true,
      creatorId: true,
      creator: true,
    },
  });
  return meets;
}

export type UserParticipatingMeet = Awaited<
  ReturnType<typeof getUserParticipatingMeets>
>[number];
