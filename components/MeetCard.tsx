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
	venueImage: string;
	activityType: string;
	venueAddress: string;
	date: string;
	time: string;
	numberOfParticipants: number;
	creator?: string;
};

export default function MeetCard({
	venueId,
	venueImage,
	activityType,
	venueAddress,
	date,
	time,
	creator,
	numberOfParticipants,
}: MeetCardProps) {
	return (
		<Card className='max-w-md'>
			<CardHeader className='flex flex-row gap-6'>
				<img
					src={venueImage}
					alt={activityType}
					className='size-16 rounded-full'
				/>
				<div className='flex flex-col gap-2'>
					<CardTitle>{activityType}</CardTitle>
					<CardDescription className='text-base font-medium'>
						{venueAddress}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='grid w-full grid-cols-3 grid-rows-3 gap-y-2  justify-center align-middle items-center'>
				{/* First Row: Creator spanning across all three columns */}
				<span className='col-span-3 pl-5'>
					Creator name: <strong>{creator}</strong>
				</span>
				{/* Second Row: Labels */}
				<span className='text-center'>Participants:</span>
				<span className='text-center'>Date:</span>
				<span className='text-center'>Time:</span>
				{/* Third Row: Values */}
				<span className='text-center'>
					<strong>{numberOfParticipants}</strong>
				</span>
				<span className='text-center'>
					<strong>{date}</strong>
				</span>
				<span className='text-center'>
					<strong>{time}</strong>
				</span>
			</CardContent>
		</Card>
	);
}
