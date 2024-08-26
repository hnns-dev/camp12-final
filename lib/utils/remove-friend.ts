import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';


const prisma = new PrismaClient();

/**
 * Add two users as friends.
 * @param userOne - ID of the first user.
 * @param userIdTwo - ID of the second user.
 */

// Function to remove friendship between two users
export async function removeFriend(userIdOne: string, userIdTwo: string): Promise<void> {
    try {
  // Update both users to remove the friend relationship
  await prisma.user.update({
    where: { id: userIdOne },
    data: {
      friends: {
        disconnect: { id: userIdTwo }, // Remove userTwo from userOne's friends
      },
    },
  });

  await prisma.user.update({
    where: { id: userIdTwo },
    data: {
      friends: {
        disconnect: { id: userIdOne }, // Remove userOne from userTwo's friends
      },
    },
  });

      // ! future clean-up!
      // console.log
      console.log('user is being unfreinded');
    } catch (error) {
      console.error('Error removing friend: ', error);
      throw new Error('Failed to remove friend');
    } finally {
      await prisma.$disconnect();
    }
    // ! or should it be just: "/friends" ?
    redirect("/profile/friends")
  }