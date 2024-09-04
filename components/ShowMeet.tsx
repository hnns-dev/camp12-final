// import { FaTableTennis } from "react-icons/fa";
// import { InteractionBar } from "./InteractionBar";
import MeetCard from "./MeetCard";
// import { prisma } from "../lib/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const userId = "aserifkt547eu323";

type MeetCardProps = {
	venueId: string;
	venueImage: string;
	activityType: string;
	venueAddress: string;
	date: string;
	time: string;
	numberOfParticipants: number;
	creator?: string;
};

export default async function ShowMeets() {
	async function getUserCreatedMeets() {
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
			},
		});
		return meets;
	}

	const result = await getUserCreatedMeets();

	const userCreatedMeets = result.map((meet) => ({
		venueId: meet.Venue.id,
		venueImage: meet.Venue.image,
		activityType: meet.activityType.name,
		venueAddress: meet.Venue.location,
		date: meet.date.toISOString().split("T")[0],
		time: meet.time,
		numberOfParticipants: meet.participants.length + meet.guests,
		creator: meet.creatorId,
	}));

	// console.log(formatedMeets);

	async function getUserParticipatingMeets() {
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
			},
		});
		// console.log(meets);
		return meets;
	}

	const participatingMeets = await getUserParticipatingMeets();

	const userParticipatingMeets = participatingMeets.map((meet) => ({
		venueId: meet.Venue.id,
		venueImage: meet.Venue.image,
		activityType: meet.activityType.name,
		venueAddress: meet.Venue.location,
		date: meet.date.toISOString().split("T")[0],
		time: meet.time,
		numberOfParticipants: meet.participants.length + meet.guests,
		creator: meet.creatorId,
	}));

	console.log(userParticipatingMeets);

	const renderCard = (meet: MeetCardProps, key: number) => (
		<MeetCard
			key={key}
			venueId={meet.venueId}
			venueImage={meet.venueImage}
			activityType={meet.activityType}
			venueAddress={meet.venueAddress}
			date={meet.date}
			time={meet.time}
			numberOfParticipants={meet.numberOfParticipants}
			creator={meet.creator}
		/>
		// <Card key={key}>
		// 	<CardHeader>
		// 		<CardTitle>{item.title}</CardTitle>
		// 		<CardDescription>{item.address}</CardDescription>
		// 	</CardHeader>
		// 	<CardContent>
		// 		<p>Date: {item.date}</p>
		// 		{item.time && <p>Time: {item.time}</p>}
		// 		<img
		// 			src={item.img}
		// 			alt={item.title}
		// 		/>
		// 	</CardContent>
		// </Card>
	);

	// const allMeets = meets.map(renderCard);

	// const myOwnMeets = meets;
	// .filter((item) => item.creator === userId)
	// .map(renderCard);

	// const renderEmptyState = (message: string) => <p>{message}</p>;

	// const allMeetsContent =
	// 	allMeets.length > 0 ? allMeets : renderEmptyState("No events found.");
	// const myOwnMeetsContent =
	// 	myOwnMeets.length > 0
	// 		? myOwnMeets
	// 		: renderEmptyState("No events is created by you.");

	return (
		<Tabs
			defaultValue='myown-meets'
			className='w-[350px] flex flex-col flex-1 mt-4 max-h-full'
		>
			<TabsList className='flex justify-center'>
				<TabsTrigger value='myown-meets'>Own meets</TabsTrigger>
				<TabsTrigger value='all-meets'>Near me</TabsTrigger>
			</TabsList>
			<TabsContent
				value='myown-meets'
				className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
			>
				{/* {myOwnMeetsContent} */}
			</TabsContent>
			<TabsContent
				value='all-meets'
				className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
			>
				{/* {allMeetsContent} */}
			</TabsContent>
		</Tabs>
	);
}
