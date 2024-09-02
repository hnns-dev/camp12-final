import { prisma } from "@/lib/db";

export async function createActivityType(data: {
  activityType: string;
  description: string;
  requiredNumberOfParticipants: number;
}) {
  try {
    const newActivity = await prisma.activityType.create({
      data: {
        name: data.activityType,
        description: data.description,
        requiredNumberOfParticipants: data.requiredNumberOfParticipants,
      },
    });
    return newActivity;
  } catch (error) {
    throw new Error("Error creating activity");
  }
}
