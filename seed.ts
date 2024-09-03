import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Fetch venue IDs dynamically

  console.log("Cleaning Database...");

  await prisma.user.deleteMany();
  await prisma.activityType.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.badge.deleteMany();

  console.log("Cleaning Database finished");

  // Activity Types
  const basketball = await prisma.activityType.create({
    data: {
      name: "Basketball",
      description: "A team sport played on a court",
      requiredNumberOfParticipants: 10,
    },
  });

  const tennis = await prisma.activityType.create({
    data: {
      name: "Tennis",
      description: "A racket sport played individually or in doubles",
      requiredNumberOfParticipants: 2,
    },
  });

  const yoga = await prisma.activityType.create({
    data: {
      name: "Yoga",
      description: "A physical and mental practice",
      requiredNumberOfParticipants: 1,
    },
  });
  const boule = await prisma.activityType.create({
    data: {
      name: "Boule",
      description: "Tossing metal balls and drinking pastis",
      requiredNumberOfParticipants: 2,
    },
  });

  // Venues
  const weisseElster = await prisma.venue.create({
    data: {
      name: "Weisse Elster",
      location: [51.330184277926, 12.371808439493],
      image: "/elster.jpg",
      activityTypes: {
        connect: {
          id: tennis.id,
        },
      },
    },
  });

  const musselGym = await prisma.venue.create({
    data: {
      name: "Mussel Gym",
      location: [51.34037781763, 12.32281923294],
      image: "/mussel.jpg",
      activityTypes: {
        connect: {
          id: yoga.id,
        },
      },
    },
  });

  const beachClubCossi = await prisma.venue.create({
    data: {
      name: "Beach Club Cossi",
      location: [51.317229196977, 12.334948182106],
      image: "/cossi.jpg",
      activityTypes: {
        connect: {
          id: basketball.id,
        },
      },
    },
  });
  const bouleBahnBerlin = await prisma.venue.create({
    data: {
      name: "Boule Bahn Berlin",
      location: [51.320008587211, 12.337681353092],
      image: "/example.png",
      activityTypes: {
        connect: {
          id: boule.id,
        },
      },
    },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      id: "aserifkt547eu392",
      email: "user1@example.com",
      name: "Hans Meiser",
      settings: {
        create: {
          friendsVisibility: "Private",
          profileVisibility: "Private",
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "aserifkt547eu323",
      email: "user2@example.com",
      name: "Tine Wittler",
      settings: {
        create: {
          friendsVisibility: "Friends_Only",
          profileVisibility: "Friends_Only",
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: "as222fkt547eu392",
      email: "user3@example.com",
      name: "Conchita Wurst",
      settings: {
        create: {
          friendsVisibility: "Public",
          profileVisibility: "Public",
        },
      },
    },
  });

  // Tags
  const outdoorTag = await prisma.tag.create({ data: { name: "Outdoor" } });
  const indoorTag = await prisma.tag.create({ data: { name: "Indoor" } });
  const relaxingTag = await prisma.tag.create({ data: { name: "Relaxing" } });

  // Meets (including one tournament)
  await prisma.meet.create({
    data: {
      date: new Date("2024-08-29"),
      time: "14:00",
      duration: 2,
      isPublic: false,
      creatorId: user1.id,
      participants: { connect: [{ id: user2.id }, { id: user3.id }] },
      guests: 2,
      notes: "Freundliches Basketballspiel",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: weisseElster.id,
      activityTypeId: basketball.id,
      competitive: true,
    },
  });

  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "10:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 1,
      notes: "Tennistraining",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: beachClubCossi.id,
      activityTypeId: tennis.id,
      competitive: false,
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "10:00",
      duration: 3,
      isPublic: false,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 3,
      notes: "juhu boule",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: bouleBahnBerlin.id,
      activityTypeId: boule.id,
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "10:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 1,
      notes: "yogimogi",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: musselGym.id,
      activityTypeId: yoga.id,
    },
  });

  await prisma.tournament.create({
    data: {
      date: new Date("2024-10-01"),
      time: "09:00",
      duration: 6,
      size: 16,
      type: "Knockout",
      mode: "Singles",
      public: true,
      creatorId: user3.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: ["Barbara Schöneberger", "Günther Jauch"],
      note: "Jährliches Tennisturnier",
      tags: { connect: [{ name: "Outdoor" }, { name: "Indoor" }] },
      venueId: musselGym.id,
      activityTypeId: tennis.id,
    },
  });

  // Badges
  await prisma.badge.create({
    data: {
      name: "Anzeigenhauptmeister",
      icon: "/parkverbot.png",
      users: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  await prisma.badge.create({
    data: {
      name: "Turniersieger",
      icon: "/gold.svg",
    },
  });

  await prisma.badge.create({
    data: {
      name: "Yoga-Meister",
      icon: "/yoga.svg",
    },
  });

  // Reports
  await prisma.report.create({
    data: {
      issue: "Defekte Ausrüstung",
      date: new Date("2024-08-10"),
      time: "16:30",
      detail: "Der Basketballkorb ist beschädigt und muss repariert werden",
      venueId: weisseElster.id,
    },
  });

  await prisma.report.create({
    data: {
      issue: "Hygieneproblem",
      date: new Date("2024-08-15"),
      time: "09:00",
      detail: "Die Umkleidekabinen müssen gründlich gereinigt werden",
      venueId: musselGym.id,
    },
  });

  await prisma.report.create({
    data: {
      issue: "unschön",
      date: new Date("2024-08-20"),
      time: "11:00",
      detail: "Ist üble Yuppiescheisse hier",
      venueId: beachClubCossi.id,
    },
  });

  console.log("Seed-Daten erfolgreich eingefügt");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
