"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function handleSubmit() {}

export function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [friendsVisibility, setFriendsVisibility] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("");
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm p-4">
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
          htmlFor="email"
        >
          E-Mail
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <Button type="submit" variant="default">
        Speichern
      </Button>
    </form>
  );
}
