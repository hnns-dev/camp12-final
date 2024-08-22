import { Switch } from "@/components/ui/switch";
import Navbar from "../components/Navbar";
import { DateTimePicker } from "@/components/date-time-picker";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-centers">
      <Navbar />
      <DateTimePicker></DateTimePicker>
    </div>
  );
}
