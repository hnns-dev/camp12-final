"use server";

import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profil nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Fehler beim Abrufen des Profils:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const body = await req.json();

    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        settings: {
          update: {
            friendsVisibility: body.settings?.friendsVisibility || undefined,
            profileVisibility: body.settings?.profileVisibility || undefined,
          },
        },
      },
      include: { settings: true },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Profils:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    );
  }
}
