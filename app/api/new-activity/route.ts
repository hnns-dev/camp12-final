import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { activityType, description, requiredNumberOfParticipants } = data;

    const newActivity = await prisma.activityType.create({
      data: {
        name: activityType,
        description: description,
        requiredNumberOfParticipants: requiredNumberOfParticipants,
      },
    });

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    );
  }
}
