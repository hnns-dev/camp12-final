"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function handleSubmit() {}

export function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [friendsVisibility, setFriendsVisibility] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("");
  return (
    <>
      <p>Test </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="friendsVisibility"
          >
            Friends Visibility
          </label>
          <select
            id="friendsVisibility"
            value={friendsVisibility}
            onChange={(e) => setFriendsVisibility(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profileVisibility"
          >
            Profile Visibility
          </label>
          <select
            id="profileVisibility"
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>

        <Button type="submit" variant="default">
          Speichern
        </Button>
      </form>
    </>
  );
}
