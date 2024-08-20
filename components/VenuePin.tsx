import React from "react";

// Define the possible states for the VenuePin component
interface VenuePinProps {
  state?: "intended" | "playing" | "free"; // Make state optional
}

// VenuePin component definition
export const VenuePin = ({ state }: VenuePinProps) => {
  // Determine the color based on the state or use white if no state is provided
  const getColor = () => {
    switch (state) {
      case "intended":
        return "#FFD166"; // Orange for "intended" state
      case "playing":
        return "#EF476F"; // Red for "playing" state
      case "free":
        return "#06D6A0"; // Green for "free" state
      default:
        return "#FFFFFF"; // Default color (white) if no state is provided
    }
  };

  return (
    // SVG element representing the venue pin
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      // Apply the main color (dark blue) directly via the fill attribute
      fill="#073B4C"
    >
      {/* Path for the main pin shape */}
      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
      {/* Circle for the inner dot, color is dynamically set based on the state */}
      <circle cx="12" cy="8" r="3" fill={getColor()} />
    </svg>
  );
};
