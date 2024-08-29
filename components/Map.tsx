"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  TileLayer,
} from "react-leaflet";
import data from "@/lib/filtered_output_data.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

type MapProps = {
  openDrawer: () => void;
};

const mtLayer = new MaptilerLayer();

export default function MapComponent({ openDrawer }: MapProps) {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [initialBoundsSet, setInitialBoundsSet] = useState(false);

  function latLngToArray(latLng: any): [number, number] {
    return [latLng.lat, latLng.lng];
  }

  function getNearestVenue(userLocation: LatLngExpression): LatLngExpression {
    const userLoc = latLngToArray(userLocation);
    let result: LatLngExpression = userLocation;
    let minDistance = 9999;
    for (let key in data) {
      const venueLoc: [number, number] = data[key].geolocation as [
        number,
        number
      ];
      let distance =
        Math.sqrt(Math.pow(userLoc[0] - venueLoc[0], 2)) +
        Math.sqrt(Math.pow(userLoc[1] - venueLoc[1], 2));
      if (distance < minDistance) {
        minDistance = distance;
        result = venueLoc;
      }
    }
    return result;
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos: LatLngExpression = [latitude, longitude];
          setUserPosition(userPos);
          setLocation(getNearestVenue(userPos));
          setLoading(false);
        },
        (error) => {
          console.error("Error getting User location", error);
          setUserPosition([51.3397, 12.3731]);
          setLocation([51.3397, 12.3731]);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geo location is not supported by the browser");
      setLoading(false);
    }
  }, []);

  function MapEvents() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        const newUserPos = e.latlng;
        setUserPosition(newUserPos);
        const newLocation = getNearestVenue(newUserPos);
        setLocation(newLocation);
        map.flyTo(newLocation, map.getZoom());
        openDrawer();
      },
    });
    return null;
  }

  const bounds = useMemo(() => {
    if (data.length === 0) return null;
    const validLocations = data.filter(
      (entry) =>
        Array.isArray(entry.geolocation) && entry.geolocation.length === 2
    ) as { geolocation: LatLngTuple }[];
    if (validLocations.length === 0) return null;
    const initialBounds = L.latLngBounds(
      validLocations[0].geolocation,
      validLocations[0].geolocation
    );
    validLocations.forEach((entry) => {
      initialBounds.extend(entry.geolocation);
    });
    return initialBounds;
  }, [data]);

  function BoundsHandler() {
    const map = useMap();
    useEffect(() => {
      if (bounds && !initialBoundsSet) {
        map.fitBounds(bounds);
        setInitialBoundsSet(true);
      }
    }, [map, bounds, initialBoundsSet]);
    return null;
  }

  if (loading) {
    return (
      <div className="w-screen h-screen-without-bar bg-zinc-300 text-center p-20">
        Loading
      </div>
    );
  }
  const apiKey = "t0PuwpKqOOMHjooJvwN7";
  const useMaptiler = false; // Setzen Sie dies auf false, um die Standard-TileLayer zu verwenden

  if (typeof window !== "undefined" && userPosition !== null) {
    return (
      <MapContainer
        center={userPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen-without-bar"
      >
        {useMaptiler ? (
          <MaptilerLayer apiKey={apiKey} />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) => {
            return L.divIcon({
              html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
              className: "custom-cluster-icon",
              iconSize: L.point(40, 40),
            });
          }}
        >
          {data.map((entry, index) => (
            <Marker
              key={index}
              position={[
                entry.geolocation[0] === null ? 0 : entry.geolocation[0],
                entry.geolocation[1] === null ? 0 : entry.geolocation[1],
              ]}
              icon={L.icon({
                iconUrl: "/placeholder.svg",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>{"Unnamed Venue"}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {userPosition && (
          <Marker
            position={userPosition}
            icon={L.icon({
              iconUrl: "/user-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
        {location && (
          <Marker
            position={location}
            icon={L.icon({
              iconUrl: "/nearest-venue-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>Nearest Venue</Popup>
          </Marker>
        )}
        <MapEvents />
        <BoundsHandler />
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
