"use client";
import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
import Map from "@/components/Map";
import { useState } from "react";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="h-screen w-full">
      <DrawerHompage isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <Navbar />
      <Map openDrawer={openDrawer} />
    </div>
  );
}
