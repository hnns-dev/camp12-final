"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Typen für die Profildaten
type User = {
  id: string;
  initials: string;
  name: string;
  picture: string | null;
  badges: Badges[];
};

type Badges = {
  name: string;
  icon: string;
};

export default function ProfilePage() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    //fetching data from db
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${userId}`);
        const data: User = await response.json();
        setProfileData(data);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Error refreshing data");
      }
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  if (!profileData) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link href={`/qr-add-friend`}>
          <Button variant={"ghost"}>Add Friends</Button>
        </Link>
        <Button variant={"ghost"}>
          <img src="/settings.svg" alt="Settings" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profileData.picture || "/placeholder-user.jpg"}
              alt="@shadcn"
            />
            <AvatarFallback>{profileData.initials}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-lg font-medium">{profileData.name}</div>
        </div>

        {/* Formular zur Bearbeitung des Namens */}
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
        </form>
      </div>
    </div>
  );
}
