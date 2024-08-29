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
  id: string;
  date: Date;
  time: string;
  duration: number;
  isPublic: boolean;
  creatorId: string;
  guests: number;
  notes?: string;
  venueId: string;
  activityTypeId: string;
}

export const createMeet = async ({
  id,
  date,
  time,
  duration,
  isPublic,
  creatorId,
  guests,
  notes,
  venueId,
  activityTypeId,
}: MeetProps) => {
  await prisma.meet.create({
    data: {
      id: id,
      date: date,
      time: time,
      duration: duration,
      isPublic: isPublic,
      creatorId: creatorId,
      guests: guests,
      notes: notes,
      venueId: venueId,
      activityTypeId: activityTypeId,
    },
  });
};
