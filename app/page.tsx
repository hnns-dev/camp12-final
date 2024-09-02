"use client";

import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import { DrawerHompage } from "@/components/DrawerHomepage";

export default function Home() {
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
    <div className="h-screen relative">
      <Map openDrawer={openDrawer}  />
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <Navbar />
      <Search />
      <Filter />
    </div>
  );
}
