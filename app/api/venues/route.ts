import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";



export async function GET() {
  try {
    const venues = await prisma.venue.findMany({
      select: { id: true, name: true },
    });
    return NextResponse.json(venues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}
