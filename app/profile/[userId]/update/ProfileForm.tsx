"use client";
import { User } from "lucia";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePicture, updateProfile } from "@/actions/profile";
import { toast } from "sonner";
import { EdgeStoreProvider, useEdgeStore } from "@/lib/edgestore";
import { ArrowLeft, PencilIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [imageUrl, setImageUrl] = useState<string>(user.picture ?? "");
  const [image, setImage] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateProfile(user.id, name, email);
    toast("Profile Updated!");
  }

  return (
    <div className="p-4 flex flex-col">
      <div className="mb-4">
        <Link href="/profile/me">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
      </div>
      <Link
        href={`/profile/${user.id}/update/picture`}
        className="relative self-start"
      >
        <Avatar className="object-cover">
          <AvatarImage src={user.picture ?? ""} />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>
        <div className="absolute size-8 rounded-full bg-foreground bottom-0 right-0 flex items-center justify-center">
          <PencilIcon className="text-background/80 size-4" />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className="w-full">
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
          Update Profile
        </Button>
      </form>
    </div>
  );
}
