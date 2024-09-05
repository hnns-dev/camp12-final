import { UserCreatedMeet, UserParticipatingMeet } from "@/lib/utils/getMeets";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { format } from "date-fns";

// Define props type
type MeetCardProps = {
	meet: UserCreatedMeet | UserParticipatingMeet;
};

export default function MeetCard({ meet }: MeetCardProps) {
	return (
		<Card className='max-w-md'>
			<CardHeader className='flex flex-row gap-6'>
				<img
					src={meet.Venue.image ?? "/public/signin-hero.jpg"}
					alt={meet.activityType.name}
					className='size-16 rounded-full'
				/>
				<div className='flex flex-col gap-2'>
					<CardTitle>{meet.activityType.name}</CardTitle>
					<CardDescription className='text-base font-medium'>
						{meet.Venue.location}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='grid w-full grid-cols-3 grid-rows-3 gap-y-2  justify-center align-middle items-center'>
				{/* First Row: Creator spanning across all three columns */}
				<span className='col-span-3 pl-5'>
					Creator name: <strong>{meet.creator.name}</strong>
				</span>
				{/* Second Row: Labels */}
				<span className='text-center'>Participants:</span>
				<span className='text-center'>Date:</span>
				<span className='text-center'>Time:</span>
				{/* Third Row: Values */}
				<span className='text-center'>
					<strong>{meet.participants.length + meet.guests}</strong>
				</span>
				<span className='text-center'>
					<strong>{format(meet.date, "dd MMM yyyy")}</strong>
				</span>
				<span className='text-center'>
					<strong>{meet.time}</strong>
				</span>
			</CardContent>
		</Card>
	);
}
