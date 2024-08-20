type BadgeName =
  | "GoldBadge"
  | "SilverBadge"
  | "BronzeBadge"
  | "Contributor"
  | "TopPerformer"
  | "Newbie";
// Add or change badge names as needed

export function badgeIconMapper(badgeName: BadgeName): string {
  const iconMapping: Record<BadgeName, string> = {
    GoldBadge: "🥇",
    SilverBadge: "🥈",
    BronzeBadge: "🥉",
    Contributor: "👥",
    TopPerformer: "🌟",
    Newbie: "🔰",
    // Add or change mappings as needed
  };

  return iconMapping[badgeName] || "🏅"; // Default icon if the badge name is not found
}
