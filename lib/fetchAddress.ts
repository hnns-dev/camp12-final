export async function fetchAddress(lat: string, lon: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const apiUrl = `https://api.geoapify.com/v1/geocode/reverse`;

  if (!apiKey) {
    throw new Error(
      "Geoapify API Key is not defined in environment variables."
    );
  }

  const response = await fetch(
    `${apiUrl}?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.features[0].properties;

  return {
    street: address.street,
    city: address.city,
    state: address.state,
    postalCode: address.postcode,
  };
}

const lat = "37.7749";
const lon = "-122.4194";
const address = await fetchAddress(lat, lon);
console.log(address);
