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
	const renderCard = (meetProp: MeetCardProps, key: number) => (
		<MeetCard
			key={key}
			venueId={meetProp.venueId}
			venueImage={meetProp.venueImage}
			activityType={meetProp.activityType}
			venueAddress={meetProp.venueAddress}
			date={meetProp.date}
			time={meetProp.time}
			numberOfParticipants={meetProp.numberOfParticipants}
			creator={meetProp.creator}
		/>
	);
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
				creator: true,
			},
		});
		return meets;
	}

	const userCreatedMeets = await getUserCreatedMeets();

	// Fist map assigns db results into the props
	// second map passes the data into html card
	const userCreatedMeetsCards = userCreatedMeets
		.map((meet) => ({
			venueId: meet.Venue.id,
			venueImage: meet.Venue.image,
			activityType: meet.activityType.name,
			venueAddress: meet.Venue.location,
			date: meet.date.toISOString().split("T")[0],
			time: meet.time,
			numberOfParticipants: meet.participants.length + meet.guests,
			creator: meet.creator.name,
		}))
		.map(renderCard);

	console.log(userCreatedMeets);

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
				creator: true,
			},
		});
		return meets;
	}

	const participatingMeets = await getUserParticipatingMeets();

	const userParticipatingMeetsCards = participatingMeets
		.map((meet) => ({
			venueId: meet.Venue.id,
			venueImage: meet.Venue.image,
			activityType: meet.activityType.name,
			venueAddress: meet.Venue.location,
			date: meet.date.toISOString().split("T")[0],
			time: meet.time,
			numberOfParticipants: meet.participants.length + meet.guests,
			creator: meet.creator.name,
		}))
		.map(renderCard);

	return (
		<div>
			<Tabs
				defaultValue='account'
				className='w-[400px]'
			>
				<TabsList>
					<TabsTrigger value='account'>Account</TabsTrigger>
					<TabsTrigger value='password'>Password</TabsTrigger>
				</TabsList>
				<TabsContent value='account'>
					Make changes to your account here.
				</TabsContent>
				<TabsContent value='password'>Change your password here.</TabsContent>
			</Tabs>

			<Tabs
				defaultValue='own-meets'
				className='w-[350px] flex flex-col flex-1 mt-4 max-h-full'
			>
				<TabsList className='flex justify-center'>
					<TabsTrigger value='own-meets'>Own meets</TabsTrigger>
					<TabsTrigger value='all-meets'>Participating meets</TabsTrigger>
				</TabsList>
				<TabsContent
					value='own-meets'
					className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
				>
					{userCreatedMeetsCards}
				</TabsContent>
				<TabsContent
					value='all-meets'
					className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
				>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
						tempora deleniti voluptates vero quisquam, consequatur accusantium
						ipsam deserunt nobis a. Cum ipsa officiis similique incidunt est
						ullam accusamus excepturi sed?
					</p>
				</TabsContent>
			</Tabs>
			{userParticipatingMeetsCards}
		</div>
	);
}
