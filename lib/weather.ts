// lib/weather.ts
export async function fetchWeather(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;

  console.log({ apiKey, apiUrl });

  if (!apiKey || !apiUrl) {
    throw new Error("API Key or URL is not defined in environment variables.");
  }

  const response = await fetch(
    `${apiUrl}?q=${city}&key=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  console.log(data);
  return data;
}
