import Search from "@/components/Search";
import MapAndDrawer from "@/components/MapAndDrawer";
import { getVenues } from "./api/data-acces/get-venues";
import { FilterDrawer } from "@/components/FilterDrawer";
import { filterVenues } from "@/lib/utils/filter-venues";
import { getOpenMeets } from "./api/data-acces/get-open-meets";
import { filterOpenMeets } from "@/lib/utils/filter-open-meets";
import {
  getUserCreatedMeets,
  getUserParticipatingMeets,
} from "@/lib/utils/getMeets";
import { prisma } from "@/lib/db";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const venues = await getVenues();

  const openMeets = await getOpenMeets();

  const parseBoolean = (val: string) => (val === "true" ? true : false);

  const filters = {
    activity: (searchParams.activity as string) ?? "",
    status: (searchParams.status as string) ?? "",
    mode: (searchParams.mode as string) ?? "",
  };

  const user = {
    id: "aserifkt547eu323",
  };

  const myMeets = await getUserCreatedMeets(user?.id);
  const participatingMeets = await getUserParticipatingMeets(user?.id);
  const activities = await prisma.activityType.findMany({});
  console.log(filters);

  const filteredVenues = filterVenues(venues, filters);
  const filteredOpenMeets = filterOpenMeets(openMeets, filters);
  return (
    <div className="h-screen relative overflow-hidden">
      <MapAndDrawer
        venues={filteredVenues}
        openMeets={filteredOpenMeets}
        userCreatedMeets={myMeets}
        userPariticpatingMeets={participatingMeets}
      />

      <Search />
      <FilterDrawer activities={activities} />
    </div>
  );
}
