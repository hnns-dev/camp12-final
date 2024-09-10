import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import jsonData from "../lib/filtered_output_data.json";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

type MapProps = {
  openDrawer: (venueData: VenueData) => void; // Change: now accepts venue data
};

// Define the structure of each entry in the 'data' array
interface VenueEntry {
  geolocation: number[]; // Latitude and longitude as an array of numbers
  name?: string; // Name of the venue (optional)
  address?: string; // Address of the venue (optional)
}

const filteredData: VenueEntry[] = require("../lib/filtered_output_data.json");

export interface VenueData {
  name: string;
  address: string;
  distance: string;
  geolocation: LatLngExpression;
}

export default function Map2({ openDrawer }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  );
  // reference is used to ensure that the coordinates are not null in important calculations
  const userPositionRef = useRef<LatLngExpression | null>(null);
  useEffect(() => {
    userPositionRef.current = userPosition;
  }, [userPosition]);

  // build map
  useEffect(() => {
    // if the map exists, or if the mapContainer is missing, abort the useEffect
    if (map.current || !mapContainer.current) return;

    try {
      // Initialize the map
      map.current = L.map(mapContainer.current, {
        center: [51.3397, 12.3731],
        zoom: 13,
        minZoom: 3,
        maxZoom: 18,
        zoomControl: false,
      });

      // Add Maptiler layer
      new MaptilerLayer({
        apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      }).addTo(map.current);

      // Custom zoom control
      L.control.zoom({ position: "bottomright" }).addTo(map.current);

      // Move zoom control slightly upwards
      const zoomControlElement = document.querySelector(
        ".leaflet-control-zoom"
      ) as HTMLElement; // Cast to HTMLElement
      if (zoomControlElement) {
        zoomControlElement.style.marginBottom = "80px"; // Adjust this value to move the zoom control upwards
      }

      // Marker Cluster Group
      const markers = L.markerClusterGroup();
      // Add venue markers
      filteredData.forEach((entry: VenueEntry) => {
        if (entry.geolocation && entry.geolocation.length === 2) {
          const marker = L.marker(entry.geolocation as L.LatLngTuple)
            .bindPopup(entry.name || "Unnamed Venue")
            .on("click", () => {
              const venueData: VenueData = {
                name: entry.name || "Unnamed Venue",
                address: entry.address || "Unknown address",
                distance: "300m",
                geolocation: entry.geolocation as LatLngExpression,
              };
              openDrawer(venueData);
            });
          markers.addLayer(marker);
        }
      });

      // Add markers to the map
      map.current.addLayer(markers);

      setLoading(false);
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  }, [openDrawer]);

  // Ask Permission if we can locate the user
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
  }, []);

  // Event handling
  useEffect(() => {
    // if there is no map, return
    if (!map.current) return;

    function handleClick() {
      if (userPositionRef.current) {
        const nearestVenue = getNearestVenue(userPositionRef.current);
        if (nearestVenue) {
          map.current?.flyTo(nearestVenue, 16);
          // Call openDrawer with venueData, not just openDrawer()
          const venueData: VenueData = {
            name: "Nearest Venue", // Example placeholder
            address: "Some Address", // Example placeholder
            distance: "500m", // You can calculate this dynamically if needed
            geolocation: nearestVenue,
          };
          setTimeout(() => openDrawer(venueData), 1500);
        }
      } else {
        console.error("User position is not available");
      }
    }

    map.current.on("click", handleClick);
  });

  // After loading, recalculate size of map
  useEffect(() => {
    if (map.current) {
      map.current.invalidateSize();
    }
  }, [loading]);

  return (
    <div className="h-screen w-screen relative">
      <div ref={mapContainer} className="h-full w-full absolute " />
      {loading && <div>Loading...</div>}
    </div>
  );
}

// helper function
function getNearestVenue(
  userLocation: LatLngExpression
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

    const distance = Math.sqrt(
      Math.pow(userLoc[0] - venueLoc[0], 2) +
        Math.pow(userLoc[1] - venueLoc[1], 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      result = venueLoc;
    }
  }
  return result;
}
