"use client";
import { LuArrowLeft } from "react-icons/lu";

export default function Back() {
  return (
    <div className="flex w-11 h-11 rounded-xl absolute z-[999] top-4 left-4 p-3 bg-white/80 justify-between items-center">
      <LuArrowLeft className="size-8" />
    </div>
  );
}
