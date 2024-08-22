"use client";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import data from "@/lib/output_data.json";

//////////////////////////
// NOT DSVGO COMPLIANT //
/////////////////////////
export function Map() {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get your position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // set the coordinates to your position
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setLoading(false);
          console.log(`Latitude: ${latitude}, longitude: ${longitude}`);
        },
        (error) => {
          // when initially loaded or if there is an error, go to the default location
          console.error("Error getting User location", error);
          setLocation([51.3397, 12.3731]);
          setLoading(false);
        }
      );
    } else {
      console.error("Geo location is not supported by the browser");
      setLoading(false);
    }
  }, []);

  if (loading) {
    console.log("Waiting for your location");
    setLoading(false);
  }

  // typeof window is needed to avoid webpack ReferenceError
  if (typeof window !== "undefined" && location !== null && loading === false) {
    return (
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen-without-bar"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((entry, index) => (
          <Marker
            key={index}
            position={[
              entry.geolocation[0] === null ? 0 : entry.geolocation[0],
              entry.geolocation[1] === null ? 0 : entry.geolocation[1],
            ]}
          />
        ))}
      </MapContainer>
    );
  } else {
    return (
      <div className="w-screen h-screen-without-bar bg-zinc-300 text-center p-20">
        Loading
      </div>
    );
  }
}
