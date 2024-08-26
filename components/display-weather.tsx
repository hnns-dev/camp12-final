// app/components/MeetSection.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchWeather } from "../lib/weather";

interface Props {
  location: string;
}

export default function DisplayWeather({ location }: Props) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather(location);
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    getWeather();
  }, [location]);

  return (
    <div className="p-4">
      <h2>Example Weather</h2>
      {error && <p>Error fetching weather: {error}</p>}
      {weather ? (
        <div>
          <p>Location: {weather.location.name}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Weather: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
