"use server";

import { prisma } from "@/lib/db";

export async function reportVenue(
  issue: string,
  datetime: Date,
  venueId: string,
  detail?: string
) {
  return prisma.report.create({
    data: {
      issue,
      date: datetime,
      time: datetime.toTimeString().split(" ")[0],
      detail,
      venue: {
        connect: {
          id: venueId,
        },
      },
    },
  });
}

export async function createVenue(
  name: string,
  activities: string[],
  location: number[],
  image: string,
  description?: string
) {
  return prisma.venue.create({
    data: {
      name,
      activityTypes: {
        connect: activities.map((activity) => ({ id: activity })),
      },
      location,
      image,
      description,
    },
  });
}
