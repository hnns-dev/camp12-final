import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";

// Define props type
type MeetCardProps = {
	venueId: string;
	title: string;
	venueImage: string;
	activityType: string;
	venueAddress: string;
	date: string;
	time: string;
	numberOfParticipants: number;
	creator: string;
};

export default function MeetCard({
	venueImage,
	activityType,
	venueAddress,
	date,
	time,
	creator,
	numberOfParticipants,
}: MeetCardProps) {
	venueImage = "/signin-hero.jpg";
	return (
		<Card>
			<CardHeader>
				<CardTitle>{activityType}</CardTitle>
				<CardDescription>{venueAddress}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex w-full flex-row justify-between'>
					<span>Date: {date}</span>
					<span>Time: {time}</span>
				</div>
				<img
					src={venueImage}
					alt={activityType}
				/>
			</CardContent>
		</Card>
	);
}
