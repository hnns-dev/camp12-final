import { DrawerHomepage } from "@/components/DrawerHomepage";
import Navbar from "../components/Navbar";
import { Map } from "@/components/map";
import Search from "@/components/search";
import Filter from "@/components/filter";

export default function Home() {
  return (
    <div className="h-screen relative">
      <Map />
      <DrawerHomepage />
      <Navbar />
      <Search />
      <Filter />
    </div>
  );
}
