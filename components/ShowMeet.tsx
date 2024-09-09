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
  return (
    <Tabs defaultValue="own-meets" className="flex flex-col flex-1 m-5 h-4/5">
      <TabsList className="flex justify-center">
        <TabsTrigger className="flex-1" value="own-meets">
          Own meets
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="participating-meets">
          Participating meets
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="own-meets"
        className="px-4 py-2 h-full space-y-4 overflow-y-scroll"
      >
        {userCreatedMeets.length ? (
          userCreatedMeets.map((meet) => <MeetCard key={meet.id} meet={meet} />)
        ) : (
          <p>You did not create any meets yet.</p>
        )}
      </TabsContent>
      <TabsContent
        value="participating-meets"
        className="px-4 py-2 h-full space-y-4 overflow-y-scroll"
      >
        {userPariticpatingMeets.length ? (
          userPariticpatingMeets.map((meet) => (
            <MeetCard key={meet.id} meet={meet} />
          ))
        ) : (
          <p>You do not participate in any meets yet.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
