// lib/weather.ts
export async function fetchWeather(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error("API Key or URL is not defined in environment variables.");
  }

  const response = await fetch(
    `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return data;
}
