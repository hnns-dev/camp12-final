import { GetOpenMeetsResult } from "@/app/api/data-acces/get-open-meets";
import { GetVenuesResult } from "@/app/api/data-acces/get-venues";
import { MapLibreTileLayer } from "@/lib/utils/map/MapTileLayer";
import L, { LatLngExpression } from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import MapPointer from "./MapPointer";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import { MapMarkers } from "./MapMarkers";

export interface VenueData {
  id: string;
  name: string;
  address: string;
  distance?: string;
  geolocation: LatLngExpression;
}

type MapProps = {
  openDrawer: (venueData: VenueData) => void;
  venues: GetVenuesResult;
  openMeets: GetOpenMeetsResult;
  isDrawerOpen: boolean; // Add this prop
  crossVisible: boolean;
  close: () => void;
  updateCrossPos: (pos: LatLngExpression) => void;
  handleCreateMeet: () => void;
  handleCreateVenue: () => void;
  center: LatLngExpression;
};

export default function Map2({
  openDrawer,
  center,
  venues,
  openMeets,
  isDrawerOpen,
  crossVisible,
  updateCrossPos,
  close,
  handleCreateMeet,
  handleCreateVenue,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const variants = {
    open: { rotate: [0, 0, 270, 270, 0] },
    closed: { rotate: [0, 0, 0, 0, 0] },
  };
  const [isOpen, setIsOpen] = useState(false);

  function buttonHandlerMeet() {
    handleCreateMeet();
    setIsOpen((prevState) => !prevState);
  }
  function buttonHandlerVenue() {
    handleCreateVenue();
    setIsOpen((prevState) => !prevState);
  }
  return (
    <MapContainer
      center={center}
      zoom={12}
      maxZoom={18}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-screen h-screen relative"
      attributionControl={false}
    >
      <MapMarkers
        center={center}
        crossVisible={crossVisible}
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        openMeets={openMeets}
        setLoading={setLoading}
        updateCrossPos={updateCrossPos}
        venues={venues}
      />
      <MapLibreTileLayer
        style=""
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json"
      />
      {crossVisible ? (
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          className="absolute top-1/2 left-1/2 z-[999] -translate-x-1/2 -translate-y-1/2"
        >
          <MapPointer />
        </motion.div>
      ) : null}
      {crossVisible ? (
        <div className="bg-white rounded-t-3xl p-4 pb-8 border-border z-[1000] absolute bottom-0 inset-x-0">
          <div className="flex justify-end mb-4">
            <Button onClick={close} size="icon" variant="ghost">
              <XIcon className="size-5" />
            </Button>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1" onClick={buttonHandlerMeet}>
              Create Meet
            </Button>
            <Button className="flex-1" onClick={buttonHandlerVenue}>
              Create Venue
            </Button>
          </div>
        </div>
      ) : null}
    </MapContainer>
  );
}
