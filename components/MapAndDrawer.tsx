"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { DrawerHompage } from "./DrawerHomepage";
import { GetVenuesResult } from "@/app/api/data-acces/get-venues";
import { Meet } from "@prisma/client";
import { GetOpenMeetsResult } from "@/app/api/data-acces/get-open-meets";

export default function MapAndDrawer({
  venues,
  openMeets,
}: {
  venues: GetVenuesResult;
  openMeets: GetOpenMeetsResult;
}) {
  console.log(venues);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p className="p-40 text-center">A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <Map openDrawer={openDrawer} venues={venues} openMeets={openMeets} />
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
}
