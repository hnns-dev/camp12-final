"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { DrawerHompage } from "./DrawerHomepage";
import { GetVenuesResult } from "@/app/api/data-acces/get-venues";
import { GetOpenMeetsResult } from "@/app/api/data-acces/get-open-meets";
import { VenueData } from "./Map"; // Import VenueData type
import Navbar from "./Navbar";
import {
  AllMeet,
  UserCreatedMeet,
  UserParticipatingMeet,
} from "@/lib/utils/getMeets";
import { LatLngExpression } from "leaflet";
import { useRouter } from "next/navigation";
import { fetchAddress } from "@/lib/utils/fetchAddress";
import { Meet, User } from "@prisma/client";

export default function MapAndDrawer({
  venues,
  openMeets,
  userCreatedMeets,
  userPariticpatingMeets,
  meets,
  user,
}: {
  venues: GetVenuesResult;
  openMeets: GetOpenMeetsResult;
  userCreatedMeets: UserCreatedMeet[];
  userPariticpatingMeets: UserParticipatingMeet[];
  meets: AllMeet[];
  user: User;
}) {
  const router = useRouter(); // useRouter hook from next/navigation
  // const connectURL = `/api/new-friend?user-one=${searchParams.userId}&user-two=${user.id}`;

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
  const [crossVisible, setCrossVisible] = useState(false);
  const [crossPos, setCrossPos] = useState<LatLngExpression>([0, 0]);
  const [center, setCenter] = useState<LatLngExpression>([51.3397, 12.3731]);

  const toggleCross = () => setCrossVisible((prev) => !prev);
  const close = () => setCrossVisible(false);
  const updateCrossPos = (pos: LatLngExpression) => setCrossPos(pos);

  const openDrawer = (venueData: VenueData) => {
    console.log({ venueData });

    setSelectedVenue(venueData);
    setIsDrawerOpen(true);
    console.log(crossPos);
  };

  const queryString = JSON.stringify(crossPos); // x and y coordinates

  async function handleCreateVenue() {
    try {
      const url = `/create-venue?location=${queryString.toString()}`;
      router.push(url);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCreateMeet() {
    const url = `/create-meet?location=${queryString.toString()}`;
    router.push(url);
  }

  return (
    <div>
      <Map
        center={center}
        crossVisible={crossVisible}
        close={close}
        openDrawer={openDrawer}
        venues={venues}
        openMeets={openMeets}
        isDrawerOpen={isDrawerOpen}
        updateCrossPos={updateCrossPos}
        handleCreateVenue={handleCreateVenue}
        handleCreateMeet={handleCreateMeet}
      />
      <DrawerHompage
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        venueData={selectedVenue}
      />
      <Navbar
        userCreatedMeets={userCreatedMeets}
        userPariticpatingMeets={userPariticpatingMeets}
        isDrawerOpen={isDrawerOpen}
        toggleCross={toggleCross}
        meets={meets}
        user={user}
        setCenter={setCenter}
      />
    </div>
  );
}
