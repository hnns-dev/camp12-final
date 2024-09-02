// import { FaTableTennis } from "react-icons/fa";
// import { InteractionBar } from "./InteractionBar";
import MeetCard from "./MeetCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const userId = "123";

const meets = [
	{
		venueId: "123456",
		venueImage: "/signin-hero.jpg",
		activityType: "Pingpong",
		venueAddress: "Erich Zeigner Allee",
		date: "28.08.2024",
		time: "3:00 PM",
		numberOfParticipants: 2,
		creator: "234",
	},

	{
		venueId: "123456",
		venueImage: "/signin-hero.jpg",
		activityType: "Pingpong",
		venueAddress: "Erich Zeigner Allee",
		date: "30:08.2024",
		time: "3:00 PM",
		numberOfParticipants: 2,
		creator: "123",
	},

	{
		venueId: "654321",
		venueImage: "/cossi.jpg",
		activityType: "Sweeming",
		venueAddress: "Cossi - find it on google map, lazy ass!",
		date: "30:08.2024",
		time: "10:00 AM",
		numberOfParticipants: 3,
		creator: "123",
	},

	{
		venueId: "654321",
		venueImage: "/cossi.jpg",
		activityType: "Sweeming",
		venueAddress: "Cossi - find it on google map, lazy ass!",
		date: "29:08.2024",
		time: "11:00 AM",
		numberOfParticipants: 10,
		creator: "234",
	},

	{
		venueId: "123456",
		venueImage: "/signin-hero.jpg",
		activityType: "Pingpong",
		venueAddress: "Erich Zeigner Allee",
		date: "31:08.2024",
		time: "3:00 PM",
		numberOfParticipants: 2,
		creator: "234",
	},

	{
		venueId: "987654",
		venueImage:
			"/DolliBu-Wild-Elephant-Unicorn-Plush-Stuffed-Animal-Toy-Super-Soft-Elephantcorn-Dress-Up-Removable-Outfit-Cute-Fantasy-Wildlife-Gift-12-Inch_b81bd1b7-ab9c-47a4-b273-8899acf69d63.3a2eef36493668f5b4e5d133e2559c3b.webp",
		activityType: "Hide & Seek",
		venueAddress: "Behind Bushes",
		date: "01:09.2024",
		time: "6:00 PM",
		numberOfParticipants: 20,
		creatorId: "234",
	},
];

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

export default function ShowMeets() {
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

	const allMeets = meets.map(renderCard);

	const myOwnMeets = meets
		.filter((item) => item.creator === userId)
		.map(renderCard);

	const renderEmptyState = (message: string) => <p>{message}</p>;

	const allMeetsContent =
		allMeets.length > 0 ? allMeets : renderEmptyState("No events found.");
	const myOwnMeetsContent =
		myOwnMeets.length > 0
			? myOwnMeets
			: renderEmptyState("No events is created by you.");

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
				{myOwnMeetsContent}
			</TabsContent>
			<TabsContent
				value='all-meets'
				className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
			>
				{allMeetsContent}
			</TabsContent>
		</Tabs>
	);
}
