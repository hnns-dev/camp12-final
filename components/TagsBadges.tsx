"use client";
import { FaBaby, FaTrophy } from "react-icons/fa";
import { FaTableTennisPaddleBall, FaPersonWalking } from "react-icons/fa6";
import { Badge } from "./ui/badge";

export default function TagsBadges() {
  return (
    <div className="flex flex-col justify-start text-start gap-2 mt-2">
      <div className="flex flex-wrap gap-2 px-5">
        <Badge
          variant="default"
          className=" flex gap-1 bg-turquoise text-black rounded-xl"
        >
          <FaBaby />
          Beginner-friendly
        </Badge>
        <Badge
          variant="default"
          className="flex gap-1 bg-pink  text-black rounded-xl"
        >
          <FaTrophy />
          Competetive
        </Badge>
        <Badge
          variant="default"
          className="flex gap-1 bg-rose  text-black rounded-xl"
        >
          <FaTableTennisPaddleBall />
          Equipment needed
        </Badge>
        <Badge
          variant="default"
          className="flex gap-1 bg-yellowish  text-black rounded-xl"
        >
          <FaPersonWalking />
          Players wanted
        </Badge>
      </div>
    </div>
  );
}
