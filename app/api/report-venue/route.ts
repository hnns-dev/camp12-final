import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { issue, datetime, detail, venueId } = await request.json();

    console.log("Received data:", { issue, datetime, detail, venueId }); 

    if (!issue || !datetime || !venueId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        issue,
        date: new Date(datetime),
        time: new Date(datetime).toTimeString().split(" ")[0],
        detail,
        venueId,
      },
    });

    console.log("Created report:", report); 

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
