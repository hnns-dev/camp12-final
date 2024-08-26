import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
import { Map } from "@/components/Map";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Map />
      <Navbar />
    </div>
  );
}
