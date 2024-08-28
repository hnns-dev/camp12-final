import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { issue, date, time, detail, venueId } = await request.json();

  try {
    const report = await prisma.report.create({
      data: {
        issue,
        date: new Date(date),
        time,
        detail,
        venueId,
      },
    });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 400 }
    );
  }
}
