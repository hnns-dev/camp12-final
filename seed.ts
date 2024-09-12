import { prisma } from "./lib/db";
import { generateIdFromEntropySize } from "lucia";

async function main() {
  // Fetch venue IDs dynamically

  console.log("Cleaning Database...");

  await prisma.user.deleteMany();
  await prisma.activityType.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.badge.deleteMany();
<<<<<<< HEAD
  await prisma.meet.deleteMany();
=======
  await prisma.city.deleteMany();
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
  await prisma.venue.deleteMany();

  console.log("Cleaning Database finished");

<<<<<<< HEAD
  const weisseElster = await prisma.venue.upsert({
    where: { name: "Weisse Elster" },
    update: {},
    create: {
      id: "51061930-e1a1-4e20-a792-0bdcaeb92004",
      name: "Weisse Elster",
      location: "Clara Park",
      image: "/Elster.jpg",
    },
  });

  const musselGym = await prisma.venue.upsert({
    where: { name: "Mussel Gym" },
    update: {},
    create: {
      id: "cac656e2-3565-4387-9e03-cb80ab885a16",
      name: "Mussel Gym",
      location: "Zschochersche Str",
      image: "/mussel.jpg",
    },
  });

  const beachClubCossi = await prisma.venue.upsert({
    where: { name: "Beach Club Cossi" },
    update: {},
    create: {
      id: "1e8323f1-7be0-481f-bae7-88ecd259c739",
      name: "Beach Club Cossi",
      location: "Cospudener See",
      image: "/LiCossi.jpg",
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
=======
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
      name: "Weisser Rabe",
      address: "Weisser Rabe 12 in 161 Leipzig",
      location: [51.330184277926, 12.371808439493],
      image: "/elster.jpg",
      activityTypes: {
        connect: {
          id: tennis.id,
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
        },
      },
    },
  });

<<<<<<< HEAD
  const user2 = await prisma.user.create({
    data: {
      id: "aserifkt547eu323",
      email: "user2@example.com",
      name: "Tine Wittler",
      settings: {
        create: {
          friendsVisibility: "FriendsOnly",
          profileVisibility: "FriendsOnly",
=======
  const musselGym = await prisma.venue.create({
    data: {
      name: "Mussel Gym",
      location: [51.34037781763, 12.32281923294],
      address: "Mussel Gym 12 in 161 Leipzig",
      image: "/mussel.jpg",
      activityTypes: {
        connect: {
          id: yoga.id,
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
        },
      },
    },
  });

<<<<<<< HEAD
  const user3 = await prisma.user.create({
    data: {
      id: "as222fkt547eu392",
      email: "user3@example.com",
      name: "Conchita Wurst",
      settings: {
        create: {
          friendsVisibility: "Public",
          profileVisibility: "Public",
=======
  const beachClubCossi = await prisma.venue.create({
    data: {
      name: "Beach Club Cossi",
      address: "Beach Club Cossi 12 in 161 Leipzig",
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
      address: "Boule Bahn Berlin 12 in 161 Leipzig",
      location: [51.320008587211, 12.337681353092],
      image: "/example.png",
      activityTypes: {
        connect: {
          id: boule.id,
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
        },
      },
    },
  });

<<<<<<< HEAD
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
=======
  // Users
  const user1 = await prisma.user.create({
    data: {
      id: generateIdFromEntropySize(10),
      email: "user1@example.com",
      name: "Hans Meiser",
      city: {
        create: {
          name: "Leipzig",
        },
      },
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
      id: generateIdFromEntropySize(10),
      email: "user2@example.com",
      name: "Tine Wittler",
      settings: {
        create: {
          friendsVisibility: "FriendsOnly",
          profileVisibility: "FriendsOnly",
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: generateIdFromEntropySize(10),
      email: "user3@example.com",
      name: "Conchita Wurst",
      city: {
        create: {
          name: "Berlin",
        },
      },
      settings: {
        create: {
          friendsVisibility: "Public",
          profileVisibility: "Public",
        },
      },
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
    },
  });

  // Tags
<<<<<<< HEAD
  const outdoorTag = await prisma.tag.create({ data: { name: "Outdoor" } });
  const indoorTag = await prisma.tag.create({ data: { name: "Indoor" } });
  const relaxingTag = await prisma.tag.create({ data: { name: "Relaxing" } });
=======
  await prisma.tag.create({ data: { name: "Outdoor" } });
  await prisma.tag.create({ data: { name: "Indoor" } });
  await prisma.tag.create({ data: { name: "Relaxing" } });
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba

  // Meets (including one tournament)
  await prisma.meet.create({
    data: {
<<<<<<< HEAD
      date: new Date("2024-09-15"),
=======
      date: new Date("2024-08-29"),
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
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
<<<<<<< HEAD
      isCompetitive: false,
      isRecurring: false,
=======
      competitive: true,
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
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
<<<<<<< HEAD
      isCompetitive: false,
      isRecurring: false,
=======
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
      time: "20:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 1,
      notes: "yogimogi",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: musselGym.id,
      activityTypeId: yoga.id,
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
    },
  });

  await prisma.meet.create({
    data: {
<<<<<<< HEAD
      date: new Date("2024-09-18"),
      time: "11:00",
      duration: 3,
      isPublic: false,
      creatorId: user3.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 2,
      notes: "Tennistraining",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: beachClubCossi.id,
      activityTypeId: tennis.id,
      isCompetitive: false,
      isRecurring: false,
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-10"),
      time: "16:00",
      duration: 2,
      isPublic: true,
      creatorId: user1.id,
      participants: { connect: [{ id: user2.id }, { id: user3.id }] },
      guests: 2,
      notes: "Freundliches Basketballspiel",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: weisseElster.id,
      activityTypeId: basketball.id,
      isCompetitive: false,
      isRecurring: false,
    },
  });

  await prisma.meet.create({
    data: {
      date: new Date("2024-09-12"),
      time: "14:00",
      duration: 2,
      isPublic: false,
      creatorId: user2.id,
      participants: { connect: [{ id: user3.id }] },
      guests: 2,
      notes: "Freundliches Basketballspiel",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: musselGym.id,
      activityTypeId: tennis.id,
=======
      date: new Date("2024-09-20"),
      time: "10:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 3,
      notes: "spontaneous tennis",
      tags: { connect: [{ name: "Outdoor" }] },
      activityTypeId: tennis.id,
      location: [51.328261109658, 12.361901700496],
      address: "FCKAFD-Weg 2 in 161 Leipzig",
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-08-20"),
      time: "20:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 1,
      notes: "yogimogi2",
      tags: { connect: [{ name: "Outdoor" }] },
      activityTypeId: yoga.id,
      location: [51.312818371408, 12.379196584224],
      address: "Bernd-Höcke-ist-ein-Nazi-Weg 8 in 161 Leipzig",
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "20:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 1,
      notes: "free&competitiveboule",
      tags: { connect: [{ name: "Outdoor" }] },
      activityTypeId: boule.id,
      location: [51.333365079861, 12.402499616146],
      competitive: true,
      address: "Notarealname Straße 12 in 161 Leipzig",
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-21"),
      time: "11:00",
      duration: 4,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 5,
      notes: "ballintomorrow",
      tags: { connect: [{ name: "Outdoor" }] },
      activityTypeId: basketball.id,
      location: [51.298389433094, 12.3746411875],
      competitive: false,
      address: "Karl-Pups-Straße 12 in 161 Leipzig",
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "11:00",
      duration: 4,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 5,
      notes: "ballineasily",
      tags: { connect: [{ name: "Outdoor" }] },
      activityTypeId: basketball.id,
      location: [51.333132141369, 12.335911095141],
      competitive: false,
      address: "Ballalala 12 in 161 Leipzig",
    },
  });

  // Meets (including one tournament)
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-15"),
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
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
      isCompetitive: false,
      isRecurring: false,
    },
  });

<<<<<<< HEAD
  await prisma.tournament.create({
    data: {
      date: new Date("2024-10-01"),
      time: "09:00",
      duration: 6,
      size: 16,
      type: "Knockout",
      mode: "Singles",
      public: true,
      creatorId: user1.id,
      participants: { connect: [{ id: user3.id }, { id: user2.id }] },
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

=======
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-20"),
      time: "10:00",
      duration: 1,
      isPublic: true,
      creatorId: user2.id,
      participants: { connect: [{ id: user1.id }] },
      guests: 2,
      notes: "Tennistraining",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: beachClubCossi.id,
      activityTypeId: tennis.id,
      isCompetitive: false,
      isRecurring: false,
    },
  });

  await prisma.meet.create({
    data: {
      date: new Date("2024-09-18"),
      time: "11:00",
      duration: 3,
      isPublic: false,
      creatorId: user3.id,
      participants: { connect: [{ id: user1.id }, { id: user2.id }] },
      guests: 2,
      notes: "Tennistraining",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: beachClubCossi.id,
      activityTypeId: tennis.id,
      isCompetitive: false,
      isRecurring: false,
    },
  });
  await prisma.meet.create({
    data: {
      date: new Date("2024-09-10"),
      time: "16:00",
      duration: 2,
      isPublic: true,
      creatorId: user1.id,
      participants: { connect: [{ id: user2.id }, { id: user3.id }] },
      guests: 2,
      notes: "Freundliches Basketballspiel",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: weisseElster.id,
      activityTypeId: basketball.id,
      isCompetitive: false,
      isRecurring: false,
    },
  });

  await prisma.meet.create({
    data: {
      date: new Date("2024-09-12"),
      time: "14:00",
      duration: 2,
      isPublic: false,
      creatorId: user2.id,
      participants: { connect: [{ id: user3.id }] },
      guests: 2,
      notes: "Freundliches Basketballspiel",
      tags: { connect: [{ name: "Outdoor" }] },
      venueId: musselGym.id,
      activityTypeId: tennis.id,
      isCompetitive: false,
      isRecurring: false,
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
      creatorId: user1.id,
      participants: { connect: [{ id: user3.id }, { id: user2.id }] },
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
      description: "Filed 10 reports",
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
      description: "won 10 tournaments",
      users: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  await prisma.badge.create({
    data: {
      name: "Yoga-Meister",
      icon: "/yoga.svg",
      description: "attended 100 yoga meets",
      users: {
        connect: {
          id: user3.id,
        },
      },
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

>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
  console.log("Seed-Daten erfolgreich eingefügt");
}

await main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
