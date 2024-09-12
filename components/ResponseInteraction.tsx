"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ResponseInteraction() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="flex flex-col w-full justify-center px-5">
      <Input
        className="my-5 mt-10"
        placeholder="Name"
        value={inputText}
        onChange={handleInputChange}
      />
      <div className="flex gap-5">
        <Button variant="destructive" className="flex-grow">
          Decline
        </Button>
        <Button
          variant="default"
          className="flex-grow"
          disabled={inputText.trim() === ""}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
