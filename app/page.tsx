"use client";

import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
import DisplayWeather from "@/components/display-weather";

export default function Home() {
  return (
    <div className="home-page">
      <DisplayWeather />
      <Navbar />
    </div>
  );
}
