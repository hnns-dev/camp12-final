"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addGuest(meetId: string, newGuest: string) {
  console.log("addGuest", meetId, newGuest);
  try {
    const updatedMeet = await prisma.meet.update({
      where: { id: meetId },
      data: {
        guests: {
          // add the new guest to the list of guests
          push: newGuest,
        },
      },
    });
  } catch (error) {
    console.error("Failed to add guest:", error);
    return { success: false, error: "Failed to add guest" };
  }
}