"use client";

import { useState } from "react";
import { Input } from "./ui/input";

export function Name() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("KateJ161");
  return (
    <>
      <div
        className={`${
          isLoggedIn ? "hidden" : "flex"
        } flex-col justify-start text-start gap-2 mt-2`}
      >
        {/* <p className="border-zinc-200 border-2 rounded-lg p-2 min-h-20 text-sm">
          You wanna be the very best? Then join our ultimate tournament!
        </p> */}
        <Input placeholder="Put in a name"></Input>
      </div>
      <div className={`${isLoggedIn ? "flex" : "hidden"} flex justify-center`}>
        {" "}
        <p className="border-zinc-200 border-2 rounded-lg p-2 min-h-10 w-full text-sm">
          Greetings, {userName} !
        </p>
      </div>
    </>
  );
}
