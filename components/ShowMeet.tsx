import MeetCard from "./MeetCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { UserCreatedMeet, UserParticipatingMeet } from "@/lib/utils/getMeets";

type Props = {
	userCreatedMeets: UserCreatedMeet[];
	userPariticpatingMeets: UserParticipatingMeet[];
};

export default function ShowMeets({
	userCreatedMeets,
	userPariticpatingMeets,
}: Props) {
	const renderCard = (
		meet: UserCreatedMeet | UserParticipatingMeet,
		key: number
	) => (
		<MeetCard
			key={key}
			meet={meet}
		/>
	);

	const userCreatedMeetsCards = userCreatedMeets.map(renderCard);

	const userParticipatingMeetsCards = userPariticpatingMeets.map(renderCard);

	const renderEmptyState = (message: string) => <p>{message}</p>;

	const userCreatedMeetsContent =
		userCreatedMeetsCards.length > 0
			? userCreatedMeetsCards
			: renderEmptyState("You are not participating in of other users events");
	const userParticipatingMeetsContent =
		userParticipatingMeetsCards.length > 0
			? userParticipatingMeetsCards
			: renderEmptyState("No events organized by you.");

	return (
		<div>
			<Tabs
				defaultValue='own-meets'
				className='w-[400px] flex flex-col flex-1 mt-4 max-h-full'
			>
				<TabsList className='flex justify-center'>
					<TabsTrigger value='own-meets'>Own meets</TabsTrigger>
					<TabsTrigger value='participating-meets'>
						Participating meets
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value='own-meets'
					className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
				>
					{userCreatedMeetsContent}
				</TabsContent>
				<TabsContent
					value='participating-meets'
					className='px-4 py-2 flex-1 overflow-y-scroll max-h-[350px]'
				>
					{userParticipatingMeetsContent}
				</TabsContent>
			</Tabs>
		</div>
	);
}
