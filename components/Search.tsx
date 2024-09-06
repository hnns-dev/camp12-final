"use client";
import React, { useState, useRef, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={searchRef}
      className={`absolute z-[9999] top-4 left-4 right-4 transition-all duration-300 ease-in-out ${
        isOpen ? "bg-white rounded-xl" : ""
      }`}
    >
      {isOpen ? (
        <div className="flex items-center w-full p-2">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            className="flex-grow border-none bg-white focus:outline-none"
          />
          <LuSearch
            className="size-6 ml-2 cursor-pointer flex-shrink-0"
            onClick={toggleSearch}
          />
        </div>
      ) : (
        <div
          className="flex w-11 h-11 rounded-xl p-3 bg-white/80 justify-center items-center cursor-pointer"
          onClick={toggleSearch}
        >
          <LuSearch className="size-8" />
        </div>
      )}
    </div>
  );
}
