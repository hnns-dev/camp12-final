"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Search submitted with query:", searchQuery);

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

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
      className={`absolute z-[9999] top-4 left-4 right-4 ${
        isOpen ? "bg-white rounded-xl" : ""
      }`}
    >
      {isOpen ? (
        <form onSubmit={onSearch} className="flex items-center w-full p-2">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            className="flex-grow border-none bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit">
            <LuSearch className="size-6 ml-2 cursor-pointer flex-shrink-0" />
          </button>
        </form>
      ) : (
        <div
          className="flex w-11 h-11 rounded-xl p-3 bg-white justify-center items-center cursor-pointer"
          onClick={toggleSearch}
        >
          <LuSearch className="size-6" />
        </div>
      )}
    </div>
  );
}
