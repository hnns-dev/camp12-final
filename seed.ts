import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const rainer = await prisma.user.create({
    data: {
      email: "rainer.werner@gmx.de",
      name: "rainer"
    }
  });

  const pamela = await prisma.user.create({
    data: {
      email: "pamela.rosa@gmail.com",
      name: "pamela"
    }
  });

  const venue = await prisma.venue.create({
    data: {
      location: "Erich-Zeigner-Allee 78"
    }
  })

  await prisma.tournament.create({
    data: {
      date: new Date("2024-09-15T09:00:00Z"),
      time: "15:00",
      duration: 3,
      size: 5,
      type: "one-on-one",
      mode: "Knockout",
      public: true,
      note: "This is a test tournament",
      guests: ["Tony Hawk", "Peter Gabriel"],
      creatorId: rainer.id,
      venueId: venue.id,
      participants: { connect: [{ id: pamela?.id }, { id: rainer?.id }] },
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
