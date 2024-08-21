import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <DrawerHompage />
      <Navbar />
    </div>
  );
}
