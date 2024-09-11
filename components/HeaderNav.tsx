"use client";
import { LuArrowLeft } from "react-icons/lu";
import { LuMoreVertical } from "react-icons/lu";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "./ui/button";
import type { User as PrismaUser } from "@prisma/client";
import { ActionResult } from "@/lib/utils/types";
import Link from "next/link";

interface HeaderNavProps {
  loggedInUserId: string | undefined;
  logout: () => Promise<ActionResult>;
}

export default function HeaderNav({ loggedInUserId, logout }: HeaderNavProps) {
  return (
    <header className="flex w-full justify-between px-3 py-3 items-center">
      <Button variant="ghost" size="icon">
        <Link href="/">
          <LuArrowLeft className="size-5" />
        </Link>
      </Button>

      <p className=" w-auto font-medium size-4">Profile</p>
      <ProfileDropdown loggedInUserId={loggedInUserId} logout={logout} />
    </header>
  );
}
