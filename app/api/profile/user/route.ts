import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db"; // Importiere deine Prisma-Instanz

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const profile = await prisma.user.findUnique({
      where: { id: userId },
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
      data: { name: body.name },
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
