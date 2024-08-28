"use client";

import { DrawerHompage } from "@/components/DrawerHompage";
import Navbar from "../components/Navbar";
import DisplayWeather from "@/components/display-weather";
import VenueDetailsPage from "./venue-detail/page";

export default function Home() {
  return (
    <div className="home-page">
      <VenueDetailsPage />
      <Navbar />
    </div>
  );
}
