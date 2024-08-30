"use client";
import { LuSearch } from "react-icons/lu";

export default function Search() {
  return (
    <div className="flex w-11 h-11 rounded-xl absolute z-[999] top-4 left-4 p-3 bg-white/80 justify-between items-center">
      <LuSearch className="size-8" />
    </div>
  );
}
