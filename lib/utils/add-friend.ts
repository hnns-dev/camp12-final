import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { prisma } from '../db';

/**
 * Add two users as friends.
 * @param userIdOne - ID of the first user.
 * @param userIdTwo - ID of the second user.
 */

export async function addFriend(userIdOne: string, userIdTwo: string): Promise<void> {
    try {
      // Add the user to other user's friend list
      await prisma.user.update({
        where: { id: userIdOne },
        data: {
          friends: {
            connect: { id: userIdTwo },
          },
          friendOf: {
            connect: { id: userIdTwo },
          },
        },
      });

    } catch (error) {
      console.error('Error adding friends: ', error);
      throw new Error('Failed to add friends');
    }
    // redirect("/profile")
  }

