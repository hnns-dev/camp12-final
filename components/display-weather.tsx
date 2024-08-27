// app/components/DisplayWeather.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchWeather } from "../lib/weather";
import { fetchCityName } from "../lib/geoapify";

interface Props {
  lat: number;
  lon: number;
}

export default function DisplayWeather({ lat, lon }: Props) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    async function getCityAndWeather() {
      try {
        const cityName = await fetchCityName(lat, lon);
        setCity(cityName);

        const weatherData = await fetchWeather(cityName);
        setWeather(weatherData);
      } catch (err: any) {
        setError(err.message);
      }
    }
    getCityAndWeather();
  }, [lat, lon]);

  return (
    <div className="p-4">
      <h2>Weather Information</h2>
      {error && <p>Error: {error}</p>}
      {weather ? (
        <div>
          <p>Location: {city}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Weather: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
