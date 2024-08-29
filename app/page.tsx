"use client";
import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
// import Map from "@/components/Map";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="h-screen w-screen">
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <Navbar />
      <Map openDrawer={openDrawer} />
    </div>
  );
}
