"use client";
import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
// import Map from "@/components/Map";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const Map2 = useMemo(
    () =>
      dynamic(() => import("@/components/Map2"), {
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
    <>
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <Navbar />
      {/*       <Map openDrawer={openDrawer} />
       */}
      <Map2 openDrawer={openDrawer} />
    </>
  );
}
