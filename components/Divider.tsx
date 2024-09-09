"use client";
import { LuArrowLeft } from "react-icons/lu";
import { LuMoreVertical } from "react-icons/lu";

export default function HeaderNav() {
  return (
    <header className="flex w-full justify-between p-5">
      <LuArrowLeft className="size-5" />
      <p className=" w-auto font-medium size-4">Profile</p>
      <LuMoreVertical className="size-5" />
    </header>
  );
}
