import { UserCreatedMeet, UserParticipatingMeet } from "@/lib/utils/getMeets";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";

// Define props type
type MeetCardProps = {
  meet: UserCreatedMeet | UserParticipatingMeet;
};

export default function MeetCard({ meet }: MeetCardProps) {
  return (
    <Card className="grid grid-cols-5 self-stretch gap-4">
      <img
        className="max-h-full object-cover col-span-2 rounded-md rounded-r-none"
        src="/signin-hero.jpg"
        alt="Person sitting on a ping pong table"
      />
      <div className="flex flex-col justify-center col-span-3 gap-1">
        <p className="font-semibold text-sm">{meet.activityType.name}</p>
        <p className="text-sm">Erich-Zeigner-Allee 64b</p>
        <div className="flex flex-row gap-2 items-center">
          <CalendarDaysIcon className="text-muted-foreground size-4" />

          <p className="text-xs text-muted-foreground">
            {`${format(meet.date, "dd MMM yyyy")} - ${meet.time}h`}
          </p>
        </div>
      </div>
    </Card>
  );
}
