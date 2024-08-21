"use client";

import { useState } from "react";

export function Name() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <form
        action="input"
        className={`${
          isLoggedIn ? "hidden" : "flex"
        } flex-col justify-start text-start gap-2 mt-2`}
      >
        <p className="border-zinc-200 border-2 rounded-lg p-2 min-h-20 text-sm">
          You wanna be the very best? Then join our ultimate tournament!
        </p>
      </form>
    </>
  );
}
