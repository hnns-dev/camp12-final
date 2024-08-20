type BadgeName =
  | "Gold Badge"
  | "Silver Badge"
  | "Bronze Badge"
  | "Contributor"
  | "Top Performer"
  | "Newbie";
// Add or change badge names as needed

const badgeIconMapper = (badgeName: BadgeName): string => {
  const iconMapping: Record<BadgeName, string> = {
    "Gold Badge": "🥇",
    "Silver Badge": "🥈",
    "Bronze Badge": "🥉",
    Contributor: "👥",
    "Top Performer": "🌟",
    Newbie: "🔰",
    // Add or change mappings as needed
  };

  return iconMapping[badgeName] || "🏅"; // Default icon if the badge name is not found
};

export default badgeIconMapper;
