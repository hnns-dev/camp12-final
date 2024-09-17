"use server";
import { prisma } from "@/lib/db";

export async function createActivityType(data: {
  name: string;
  description?: string;
  requiredNumberOfParticipants: number;
}) {
  try {
    const newActivity = await prisma.activityType.create({
      data: {
        name: data.name,
        description: data.description,
        requiredNumberOfParticipants: data.requiredNumberOfParticipants,
      },
    });
    return newActivity;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating activity");
  }
}
