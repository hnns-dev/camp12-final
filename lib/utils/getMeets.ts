import { prisma } from "../db";

async function doGetUserCreatedMeets(userId: string) {
	const meets = await prisma.meet.findMany({
		where: { creatorId: userId },

		select: {
			venueId: true,
			activityType: true,
			date: true,
			time: true,
			guests: true,
			participants: true,
			Venue: true,
			creatorId: true,
			creator: true,
		},
	});
	return meets;
}

export function getUserCreatedMeets() {
    
}
const userCreatedMeets = await getUserCreatedMeets();
