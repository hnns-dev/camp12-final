import Navbar from "../components/Navbar";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import MapAndDrawer from "@/components/MapAndDrawer";
import { validateRequest } from "@/lib/auth";
import {
	getUserCreatedMeets,
	getUserParticipatingMeets,
} from "@/lib/utils/getMeets";

export default async function Home() {
	const { user } = await validateRequest();
	const myMeets = await getUserCreatedMeets(user?.id);
	const participatingMeets = await getUserParticipatingMeets(user?.id);

	return (
		<div className='h-screen relative overflow-hidden'>
			<MapAndDrawer />
			<Navbar
				userCreatedMeets={myMeets}
				userPariticpatingMeets={participatingMeets}
			/>
			<Search />
			<Filter />
		</div>
	);
}
