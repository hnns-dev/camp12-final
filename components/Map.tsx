"use client";
import { LatLng, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import data from "@/lib/filtered_output_data.json";

type MapProps = {
  openDrawer: () => void;
};

export default function Map({ openDrawer }: MapProps) {
  // location of venue or view, etc..
  const [location, setlocation] = useState<LatLngExpression | null>(null);
  // location of user atm
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to convert "LatLng(50,50) to [50, 50]. Maybe deserves its own issue of handling types"
  function latLngToArray(latLng: any): [number, number] {
    return [latLng.lat, latLng.lng];
  }

  // function to locate nearest venue, takes userLocation as parameter
  function getNearestVenue(userLocation: LatLngExpression): LatLngExpression {
    // More robust in declaring userLocation this way
    const userLoc = latLngToArray(userLocation);
    let result: LatLngExpression = userLocation;
    let minDistance = 9999;
    //Go trough data
    for (let key in data) {
      const venueLoc: [number, number] = data[key].geolocation as [
        number,
        number
      ];
      // calculate distance with absolute values
      let distance =
        Math.sqrt(Math.pow(userLoc[0] - venueLoc[0], 2)) +
        Math.sqrt(Math.pow(userLoc[1] - venueLoc[1], 2));
      // If the distance is smaller then the current minDistance...
      if (distance < minDistance) {
        // then make it the new minDistance
        minDistance = distance;
        // and set the result to the location of the venue
        result = venueLoc;
      }
    }
    return result;
  }

  // Ask if we can use geolocation of device
  useEffect(() => {
    if ("geolocation" in navigator) {
      // if we have allowance, we can set the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos: LatLngExpression = [latitude, longitude];
          setUserPosition(userPos);
          setlocation(getNearestVenue(userPos));
          setLoading(false);
        },
        //If permission denied, go to the custom location
        (error) => {
          console.error("Error getting User location", error);
          setUserPosition([51.3397, 12.3731]);
          setlocation([51.3397, 12.3731]);
          setLoading(false);
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
        const newlocation = getNearestVenue(newUserPos);
        setlocation(newlocation);
        map.flyTo(newlocation, map.getZoom());
        //////////////////////////////////////
        // PUT HERE FUNCTION TO OPEN DRAWER //
        //////////////////////////////////////
        openDrawer();
      },
    });

    return null;
  }

  if (loading) {
    return (
      <div className="w-screen h-screen-without-bar bg-zinc-300 text-center p-20">
        Loading
      </div>
    );
  }

  if (typeof window !== "undefined" && userPosition !== null) {
    return (
      <MapContainer
        center={userPosition}
        zoom={18}
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
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {location && (
          <Marker position={location}>
            <Popup>Nearest Venue</Popup>
          </Marker>
        )}
        <MapEvents />
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
