"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { DrawerHompage } from "./DrawerHomepage";
import { GetVenuesResult } from "@/app/api/data-acces/venues";

export default function MapAndDrawer({ venues }: { venues: GetVenuesResult }) {
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
      <Map openDrawer={openDrawer} venues={venues} />
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
}
