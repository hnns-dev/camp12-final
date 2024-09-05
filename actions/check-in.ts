"use server";

import { prisma } from "@/lib/db";

export async function createCheckIn(data: {
  activityType: string;
  duration: number;
  userId: string;
  venueId: string;
}) {
  try {
    const newCheckIn = await prisma.checkIn.create({
      data: {
        activityType: { connect: { name: data.activityType } },
        duration: data.duration,
        user: { connect: { id: data.userId } },
        venue: { connect: { id: data.venueId } },
      },
    });
    return newCheckIn;
  } catch (error) {
    throw new Error("Error creating check-in");
  }
}
