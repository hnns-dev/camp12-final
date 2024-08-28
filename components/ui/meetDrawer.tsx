"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { User, Tournament } from "@prisma/client";

interface TournamentDrawerProps {
  tournament: Tournament & { participants: User[] };
}

export function MeetDrawer({ tournament }: TournamentDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger className="bg-zinc-300 text-purple-700 rounded-full text-xs py-1 px-2 border-2 border-purple-700">
        Participants
      </DrawerTrigger>
      <DrawerContent>
        <ul>
          {tournament.participants.map((user) => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
