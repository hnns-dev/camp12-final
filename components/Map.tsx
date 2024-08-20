"use client";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const position: [number, number] = [51.505, -0.09];

export default function Map() {
  if (typeof window !== "undefined") {
    return (
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen-without-bar"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}
