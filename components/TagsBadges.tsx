"use client";
import { FaBaby, FaTrophy } from "react-icons/fa";
import { FaTableTennisPaddleBall, FaPersonWalking } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import { IconType } from "react-icons";
import { tagConfigs } from "@/lib/utils/tags";

interface Tag {
  name: string;
}

interface TagsBadgesProps {
  tags: Tag[];
}



export default function TagsBadges({ tags }: TagsBadgesProps) {
  return (
    <div className="flex flex-col justify-start text-start gap-2 mt-2">
      <div className="flex flex-wrap gap-2 px-5">
        {tags.map((tag, index) => {
          const config = tagConfigs[tag.name] || {
            icon: FaTableTennisPaddleBall,
            color: "bg-gray-200",
          };
          const Icon = config.icon;
          return (
            <Badge
              key={index}
              variant="default"
              className={`flex gap-1 ${config.color} text-black rounded-xl`}
            >
              <Icon />
              {tag.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
