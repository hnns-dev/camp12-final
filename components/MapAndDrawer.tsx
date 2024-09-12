"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { DrawerHompage } from "./DrawerHomepage";
import { GetVenuesResult } from "@/app/api/data-acces/get-venues";
import { GetOpenMeetsResult } from "@/app/api/data-acces/get-open-meets";
import { VenueData } from "./Map"; // Import VenueData type

export default function MapAndDrawer({
  venues,
  openMeets,
}: {
  venues: GetVenuesResult;
  openMeets: GetOpenMeetsResult;
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p className="p-40 text-center">A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);

  const openDrawer = (venueData: VenueData) => {
    setSelectedVenue(venueData);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <Map
        openDrawer={openDrawer}
        venues={venues}
        openMeets={openMeets}
        isDrawerOpen={isDrawerOpen}
      />
      <DrawerHompage
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        venueData={selectedVenue}
      />
    </div>
  );
}
