"use server";

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
