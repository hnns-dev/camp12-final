import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Search from "@/components/Search";
import MapAndDrawer from "@/components/MapAndDrawer";
import { getVenues } from "./api/data-acces/get-venues";
import { FilterDrawer } from "@/components/FilterDrawer";
import { filterVenues } from "@/lib/utils/filter-venues";
import { getOpenMeets } from "./api/data-acces/get-open-meets";
import { filterOpenMeets } from "@/lib/utils/filter-open-meets";
import Filter from "@/components/Filter";
import { validateRequest } from "@/lib/auth";
import {
  getUserCreatedMeets,
  getUserParticipatingMeets,
} from "@/lib/utils/getMeets";

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
    competitive: searchParams.competitive as "yes" | "no" | "both",
  };

  const user = {
    id: "aserifkt547eu323",
  };

  const myMeets = await getUserCreatedMeets(user?.id);
  const participatingMeets = await getUserParticipatingMeets(user?.id);

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
      <FilterDrawer />
    </div>
  );
}
