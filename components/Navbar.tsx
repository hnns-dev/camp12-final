"use client";

import Link from "next/link";
import { FaCirclePlus, FaUser } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { DrawerUpComingSessions } from "./DrawerUpComingSessions";
import {
  AllMeet,
  UserCreatedMeet,
  UserParticipatingMeet,
} from "@/lib/utils/getMeets";
import { DrawerCreateVenue } from "./DrawerCreateVenue";
import { cn } from "@/lib/utils";
import { LuCalendarDays } from "react-icons/lu";
import { Meet, User } from "@prisma/client";
import { LatLngExpression } from "leaflet";

type Props = {
  userCreatedMeets: UserCreatedMeet[];
  userPariticpatingMeets: UserParticipatingMeet[];
  isDrawerOpen: boolean;
  toggleCross: () => void;
  meets: AllMeet[];
  user: User;
  setCenter: React.Dispatch<React.SetStateAction<LatLngExpression>>;
};

export default function Navbar({
  userCreatedMeets,
  userPariticpatingMeets,
  isDrawerOpen,
  toggleCross,
  meets,
  user,
  setCenter,
}: Props) {
  return (
    <nav
      // Use the cn function to merge classes conditionally
      className={cn(
        "rounded-3xl absolute z-[999] bottom-4 right-4 left-4 p-5 bg-zinc-800/80 justify-between items-center",
        isDrawerOpen ? "hidden" : "flex" // This class is conditionally applied when isDrawerOpen is true
      )}
    >
      <DrawerUpComingSessions meets={meets} user={user} defaultTab="near-me">
        <LuCalendarDays className="size-8 stroke-white" />
      </DrawerUpComingSessions>
      <FaLocationCrosshairs
        className="size-8 fill-white"
        onClick={() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                const userPos: LatLngExpression = [latitude, longitude];
                setCenter(userPos);
              },
              (error) => {
                console.error("Error getting user location:", error);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser");
          }
        }}
      />
      <button onClick={toggleCross}>
        <FaCirclePlus className="size-8 fill-white" />{" "}
      </button>
      {/* <DrawerCreateVenue /> */}
      <Link href="/profile/me" className="nav-link">
        <div className="nav-button">
          <div className="flex flex-col items-center justify-center">
            <FaUser className="size-8 fill-white" />
          </div>
        </div>
      </Link>
    </nav>
  );
}
