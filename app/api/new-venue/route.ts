"use server";

import { NextResponse, NextRequest } from "next/server";
import { submitMeet } from "../../../actions/meet";


export async function POST(request: NextRequest) {

    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId") as string;
        const venueId = url.searchParams.get("venueId") as string;
        const body = await request.json();

        const meet = await submitMeet(body, userId, venueId);
  
        return NextResponse.json(meet);
    } catch (error) {
      return NextResponse.json(
        { error: "Interner Serverfehler" },
        { status: 500 }
      );
    }
  }