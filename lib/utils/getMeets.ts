import { prisma } from "../db";

export async function getUserCreatedMeets(userId: string) {
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

export async function getUserParticipatingMeets(userId: string) {
	const meets = await prisma.meet.findMany({
		where: { participants: { some: { id: userId } } },
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
