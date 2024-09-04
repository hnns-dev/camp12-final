"use server";
import { prisma } from "@/lib/db";
import { Tag } from "@prisma/client";
import { FriendsVisibility, ProfileVisibility } from "@prisma/client";

interface SettingsProps {
  friendsVisible: FriendsVisibility;
  profileVisible: ProfileVisibility;
  userId: string;
}

// Function to handle the form submission
export const updateSettings = async ({
  friendsVisible,
  profileVisible,
  userId,
}: SettingsProps) => {
  await prisma.settings.update({
    where: { userId: userId },
    data: {
      friendsVisibility: friendsVisible,
      profileVisibility: profileVisible,
    },
  });
};

type Props = {
  names: string[];
  tag?: Tag;
};

// update new tags that are added by the user by checking if it exists and if not add it to db

export const updateTags = async ({ names, tag }: Props) => {
  const exisitngTags = await prisma.tag.findMany({ select: { name: true } });

  const exisitngTagNames = new Set(exisitngTags.map((t) => t.name));

  const newTags = names.filter((name) => !exisitngTagNames.has(name));

  if (newTags.length > 0) {
    await prisma.tag.createMany({
      data: newTags.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  if (tag && tag.name) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: tag,
      create: tag,
    });
  }
  console.log("Tag ${tag.name} updatetd or created successfully");
};

interface MeetProps {
  date: Date;
  time: string;
  duration: number;
  isPublic: boolean;
  creatorId: string;
  guests: number;
  notes?: string;
  venueId: string;
  activityTypeName: string;
}
