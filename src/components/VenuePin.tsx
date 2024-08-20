import React from "react";

// Interface to define the expected props for the VenuePin component
interface VenuePinProps {
  state: "intended" | "playing" | "free";
}

// VenuePin component definition
const VenuePin = ({ state }: VenuePinProps) => {
  // A function to return the appropriate fill color based on the state
  const getColor = () => {
    switch (state) {
      case "intended":
        return "fill-[#FFD166]"; // Orange color for "intended" state
      case "playing":
        return "fill-[#EF476F]"; // Red color for "playing" state
      case "free":
        return "fill-[#06D6A0]"; // Green color for "free" state
      default:
        return "fill-[#000000]"; // Fallback color (shouldn't be necessary due to type safety)
    }
  };

  return (
    // SVG element representing the venue pin
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      // Tailwind classes: setting the main color of the pin and ensuring the outer shape has a stroke
      className="stroke-current fill-[#073B4C]"
    >
      {/* Path for the main pin shape; the main color is applied here */}
      <path
        className="fill-current" // Use the current fill color for the pin shape
        d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
      />
      {/* Circle for the inner dot; the color is dynamically set based on the state */}
      <circle cx="12" cy="8" r="3" className={getColor()} />
    </svg>
  );
};

export default VenuePin;
