import Navbar from "../components/Navbar";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import MapAndDrawer from "@/components/MapAndDrawer";

export default function Home() {
	return (
		<div className='h-screen relative overflow-hidden'>
			<MapAndDrawer />
			<Navbar />
			<Search />
			<Filter />
		</div>
	);
}
