import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const pamela = await prisma.user.findUnique({
    where: { name: "pamela" },
  });

  const rainer = await prisma.user.findUnique({
    where: { name: "rainer" },
  });

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
      creatorId: "73889c55-0ac0-4eae-946b-d5a1ef60128b",
      venueId: "9b7f554d-3252-4cf1-a3ac-d3ccac5d9649",
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
