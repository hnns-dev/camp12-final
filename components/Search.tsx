"use client";
import React, { useState, useRef, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch async () => {
    //search logic
  }

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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-grow border-none bg-transparent focus:outline-none"
      />
          <LuSearch
            className="size-6 ml-2 cursor-pointer flex-shrink-0"
            onClick={toggleSearch}
          />
        </div>
      ) : (
        <div
          className="flex w-11 h-11 rounded-xl p-3 bg-white justify-center items-center cursor-pointer"
          onClick={toggleSearch}
        >
          <LuSearch className="size-8" />
        </div>
      )}
    </div>
  );
}
