import { FaTableTennis } from "react-icons/fa";

import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";

import { UserCreatedMeet, UserParticipatingMeet } from "@/lib/utils/getMeets";
import ShowMeets from "./ShowMeet";

type Props = {
	userCreatedMeets: UserCreatedMeet[];
	userPariticpatingMeets: UserParticipatingMeet[];
};

export function DrawerUpComingSessions({
	userCreatedMeets,
	userPariticpatingMeets,
}: Props) {
	return (
		<Drawer>
			<DrawerTrigger>
				<FaTableTennis className='size-8 fill-white' />
			</DrawerTrigger>
			<DrawerContent className='z-[9999] h-[calc(100vh-16vh)] flex flex-col'>
				<DrawerHeader>
					<DrawerTitle className='sr-only'>Upcoming sessions</DrawerTitle>
					<DrawerDescription className='sr-only'></DrawerDescription>
				</DrawerHeader>
				<ShowMeets
					userCreatedMeets={userCreatedMeets}
					userPariticpatingMeets={userPariticpatingMeets}
				/>
			</DrawerContent>
		</Drawer>
	);
}
