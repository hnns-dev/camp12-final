"use server";
import { prisma } from "@/lib/db";

interface SettingsProps {
  friendsVisible: string;
  profileVisible: string;
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

export const createMeet = async ({
  date,
  time,
  duration,
  isPublic,
  creatorId,
  guests,
  notes,
  venueId,
  activityTypeName,
}: MeetProps) => {
  await prisma.meet.create({
    data: {
      date: date,
      time: time,
      duration: duration,
      isPublic: isPublic,
      creator: {
        connect: {
          id: creatorId,
        },
      },
      Venue: {
        connect: {
          id: venueId,
        },
      },
      activityType: {
        connect: {
          name: activityTypeName,
        },
      },
      guests: guests,
      notes: notes,
    },
  });
};
