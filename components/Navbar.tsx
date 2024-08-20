"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <nav className="p-1">
      <Link href="/sessions" className="nav-link">
        <button onClick={toggleDrawer} className="nav-button">
          <div className="icon-placeholder">🎮</div> {/* Sessions Content*/}
        </button>
      </Link>
      <Link href="/profile" className="nav-link">
        <div className="nav-button">
          <div className="icon-placeholder">👤</div> {/* Profile Content*/}
        </div>
      </Link>
    </nav>
  );
}
