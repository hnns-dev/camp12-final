import { IconType } from "react-icons";
import {
  FaBaby,
  FaPersonWalking,
  FaTableTennisPaddleBall,
  FaTrophy,
} from "react-icons/fa6";

export interface TagConfig {
  icon: IconType;
  color: string;
}

export const tagConfigs: Record<string, TagConfig> = {
  "Public ground": { icon: FaBaby, color: "bg-pink" },
  "Wheelchair accessible": { icon: FaBaby, color: "bg-turquoise" },
  Relaxing: { icon: FaBaby, color: "bg-rose" },
  "Friendly neighborhood": { icon: FaBaby, color: "bg-yellowish" },
  "Dogs around": { icon: FaBaby, color: "bg-pink" },
  "Illuminated at night": { icon: FaBaby, color: "bg-yellowish" },
  Sheltered: { icon: FaBaby, color: "bg-turquoise" },
  "Beginner-friendly": { icon: FaBaby, color: "bg-turquoise" },
  Competitive: { icon: FaTrophy, color: "bg-pink" },
  "Equipment needed": { icon: FaTableTennisPaddleBall, color: "bg-rose" },
  "Players wanted": { icon: FaPersonWalking, color: "bg-yellowish" },
  // Add more mappings as needed
};
