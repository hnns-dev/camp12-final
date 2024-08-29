"use server";
import { prisma } from "@/lib/db";
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
