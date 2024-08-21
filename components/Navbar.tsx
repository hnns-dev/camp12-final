"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTableTennis } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="flex w-full justify-between items-center p-5">
      <button onClick={toggleDrawer} className="nav-button">
        <div className="flex flex-col items-center justify-center">
          <FaTableTennis className="size-6" />
          <p>Session</p>
        </div>
        {/* Sessions Content*/}
      </button>

      <Link href="/profile" className="nav-link">
        <div className="nav-button">
          <div className="flex flex-col items-center justify-center">
            <FaUserAstronaut className="size-6" />
            <p>Profile</p>
          </div>
          {/* Profile Content*/}
        </div>
      </Link>
    </nav>
  );
}
