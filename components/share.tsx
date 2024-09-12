"use client";
import { LuShare2 } from "react-icons/lu";

export default function Share() {
  return (
    <div className="flex w-11 h-11 rounded-xl absolute z-[999] top-4 right-4 p-3 bg-white/80 justify-between items-center">
      <LuShare2 className="size-8" />
    </div>
  );
}
