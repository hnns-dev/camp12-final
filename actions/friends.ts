"use server";

import { UserId } from "lucia";
import { prisma } from "../lib/db";

/**
 * Add two users as friends.
 * @param userOne - ID of the first user.
 * @param userIdTwo - ID of the second user.
 */

// Define the return type
type RemoveFriendResponse = {
  success: boolean;
  message: string;
  data?: {
    userIdOne: string;
    userIdTwo: string;
  };
};

// Function to remove friendship between two users
export async function removeFriend(
  userIdOne: string,
  userIdTwo: string
): Promise<RemoveFriendResponse> {
  try {
    // Update both users to remove the friend relationship
    await prisma.user.update({
      where: { id: userIdOne },
      data: {
        friends: {
          // Remove userTwo from userOne's friends
          disconnect: { id: userIdTwo },
        },
        friendOf: {
          // Remove userTwo from userOne's friends
          disconnect: { id: userIdTwo },
        },
      },
    });

    // If successful, return a success message
    return {
      success: true,
      message: "Friendship removed successfully",
      data: { userIdOne, userIdTwo },
    };
  } catch (error) {
    console.error("Error removing friend: ", error);

    // Return an error response instead of throwing
    return {
      success: false,
      message: "Failed to remove friendship",
    };
  }
}

// FIND ALL FRIENDS

type FriendProps = {
  userId: string;
};

export async function fiendFriends({ userId }: FriendProps) {
  const allFriends = await prisma.user.findMany({
    where: {
      OR: [
        {
          friends: {
            some: { id: userId },
          },
        },
        {
          friendOf: {
            some: { id: userId },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
    },
  });

  return allFriends.map((friend) => ({
    id: friend.id,
    name: friend.name,
    email: friend.email,
    picture: friend.picture,
  }));
}
