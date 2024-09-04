import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { Venue } from "@/lib/utils/types";

type MapProps = {
  openDrawer: () => void;
  venues: Venue[];
};

export default function Map2({ openDrawer, venues }: MapProps) {
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
  console.log("test in map2");
  // build map
  useEffect(() => {
    // if the map exists, or if the mapContainer is missing, abort the useEffect
    if (map.current || !mapContainer.current) return;

    try {
      map.current = L.map(mapContainer.current, {
        center: [51.3397, 12.3731],
        zoom: 13,
        minZoom: 3,
        maxZoom: 18,
      });

      // Vector layer
      const mtLayer = new MaptilerLayer({
        apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      }).addTo(map.current);

      // Markers beeing clustered
      const markers = L.markerClusterGroup();
      venues.forEach((venue) => {
        // Check if data is in correct format
        if (venue.location && venue.location.length === 2) {
          const marker = L.marker(venue.location as L.LatLngTuple).bindPopup(
            venue.name || "Unnamed Venue"
          );
          markers.addLayer(marker);
          console.log("Marker added for:", venue.name);
        } else {
          console.log("Invalid location for:", venue.name);
          console.log("test in venueforeach");
        }
      });
      map.current.addLayer(markers);

      setLoading(false);
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  }, [venues]);

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
  }, [venues]);

  // Event handling
  useEffect(() => {
    // if there is no map, return
    if (!map.current) return;

    function handleClick() {
      if (userPositionRef.current) {
        const nearestVenue = getNearestVenue(userPositionRef.current, venues);
        if (nearestVenue) {
          map.current?.flyTo(nearestVenue, 16);
          // a little delay for opening the drawer
          setTimeout(() => openDrawer(), 1500);
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
  userLocation: LatLngExpression,
  venues: Venue[]
): LatLngExpression | null {
  const userLoc = userLocation as [number, number];
  let result: LatLngExpression = userLocation;
  let minDistance = Infinity;

  // for (let key in data) {
  //   const venueLoc: [number, number] = data[key].geolocation as [
  //     number,
  //     number
  //   ];
  //   if (!venueLoc) continue;
  console.log(
    "Venue Locations:",
    venues.map((v) => ({ name: v.name, location: v.location }))
  );

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
  return result;
}
