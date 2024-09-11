import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { Venue } from "@/lib/utils/types";
import { GetVenuesResult } from "@/app/api/data-acces/get-venues";
import { GetOpenMeetsResult } from "@/app/api/data-acces/get-open-meets";
import jsonData from "../lib/filtered_output_data.json";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

export interface VenueData {
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
};

const venueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const meetIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map2({
  openDrawer,
  venues,
  openMeets,
  isDrawerOpen,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  );
  const userPositionRef = useRef<LatLngExpression | null>(null);

  useEffect(() => {
    userPositionRef.current = userPosition;
  }, [userPosition]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      map.current = L.map(mapContainer.current, {
        center: [51.3397, 12.3731],
        zoom: 12,
        minZoom: 3,
        maxZoom: 18,
        zoomControl: !isDrawerOpen, // Toggle zoom control based on isDrawerOpen
      });

      new MaptilerLayer({
        apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      }).addTo(map.current);

      const VenueMarkers = L.markerClusterGroup();
      const OpenMeetMarkers = L.markerClusterGroup();

      venues.forEach((venue) => {
        if (venue.location && venue.location.length === 2) {
          const marker = L.marker(venue.location as L.LatLngTuple, {
            icon: venueIcon,
          })
            .bindPopup(venue.name || "Unnamed Venue")
            .on("click", () => {
              const venueData: VenueData = {
                name: venue.name || "Unnamed Venue",
                address: venue.address || "Unknown address",
                geolocation: venue.location as LatLngExpression,
              };
              openDrawer(venueData);
            });

          VenueMarkers.addLayer(marker);
        } else {
          console.log("Invalid location for:", venue.name);
        }
      });
      map.current.addLayer(VenueMarkers);

      openMeets.forEach((meet) => {
        if (meet.location && meet.location.length === 2) {
          const marker = L.marker(meet.location as L.LatLngTuple, {
            icon: meetIcon,
          })
            .bindPopup("Meet: " + meet.activityType.name)
            .on("click", () => {
              const venueData: VenueData = {
                name: meet.activityType.name || "Unnamed Meet",
                address: meet.address || "Unknown address",
                geolocation: meet.location as LatLngExpression,
              };
              openDrawer(venueData);
            });
          VenueMarkers.addLayer(marker);
        } else {
          console.log("Invalid location for:", meet.activityType.name);
        }
      });
      map.current.addLayer(OpenMeetMarkers);
      setLoading(false);
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  }, [venues, openMeets, openDrawer, isDrawerOpen]); // Add isDrawerOpen to dependencies

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos: LatLngExpression = [latitude, longitude];
          setUserPosition(userPos);
          setLoading(false);
          if (map.current) {
            map.current.setView(userPos, 13);
            L.marker(userPos).addTo(map.current).bindPopup("You are here");
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserPosition([51.3397, 12.3731]);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setLoading(false);
    }
  }, [venues]);

  useEffect(() => {
    if (!map.current) return;

    function handleClick() {
      if (userPositionRef.current) {
        const nearestVenue = getNearestVenue(userPositionRef.current, venues);
        if (nearestVenue) {
          map.current?.flyTo(nearestVenue, 16);
          const venueData: VenueData = {
            name: "Nearest Venue",
            address: "Some Address",
            distance: "500m",
            geolocation: nearestVenue,
          };
          setTimeout(() => openDrawer(venueData), 1500);
        }
      } else {
        console.error("User position is not available");
      }
    }
  });

  return (
    <div className="h-screen-without-bar w-screen relative">
      <div ref={mapContainer} className="h-full w-full absolute" />
      {loading && <div>Loading...</div>}
    </div>
  );
}

function getNearestVenue(
  userLocation: LatLngExpression,
  venues: Venue[]
): LatLngExpression | null {
  const userLoc = userLocation as [number, number];
  let result: LatLngExpression = userLocation;
  let minDistance = Infinity;

  for (let key in jsonData) {
    const venueLoc: [number, number] = jsonData[key].geolocation as [
      number,
      number
    ];
    if (!venueLoc) continue;

    venues.forEach((venue) => {
      if (venue.location && venue.location.length === 2) {
        const venueLoc: [number, number] = venue.location as [number, number];

        const distance = Math.sqrt(
          Math.pow(userLoc[0] - venueLoc[0], 2) +
            Math.pow(userLoc[1] - venueLoc[1], 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          result = venueLoc;
        }
      }
    });
  }
  return result;
}
