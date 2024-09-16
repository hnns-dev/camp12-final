"use client";
import { User } from "lucia";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/profile";
import { toast } from "sonner";
import { EdgeStoreProvider, useEdgeStore } from "@/lib/edgestore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [image, setImage] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    // Fetch image from user.picture and convert to file
    setImage();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let imageUrl = "";
    if (image) {
      const res = await edgestore.publicFiles.upload({
        file: image,
        onProgressChange: (progress: any) => {
          console.log(progress);
        },
      });
      imageUrl = res.url;
    }
    await updateProfile(user.id, name, email, imageUrl);
    toast("Profile Updated!");
  }

  return (
    <EdgeStoreProvider>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4">
        <div className="mb-4">
          <Link href="/profile/me">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Avatar
          </label>
          <input
            type="file"
            className="mb-4"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setImage(file);
            }}
          />
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
          Update Profile
        </Button>
      </form>
    </EdgeStoreProvider>
  );
}
