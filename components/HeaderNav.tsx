"use client";
import { LuArrowLeft } from "react-icons/lu";
import { LuMoreVertical } from "react-icons/lu";
import ProfileDropdown from "./ProfileDropdown";

export default function HeaderNav() {
  return (
    <header className="flex w-full justify-between px-3 py-3 items-center">
      <LuArrowLeft className="size-5" />
      <p className=" w-auto font-medium size-4">Profile</p>
      <ProfileDropdown />
    </header>
  );
}
