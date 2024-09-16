// /actions/response.ts
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getResponseData(responseId: string) {
  try {
    const response = await prisma.response.findUnique({
      where: { id: responseId },
      include: {
        meet: {
          include: {
            venue: true,
            activityType: true,
            tags: true,
            participants: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (!response) {
      throw new Error("Response not found");
    }

    return response;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
