import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function BadgesComponent({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  // Example badge data - replace with your actual data

  const badges = await prisma.badge.findMany({
    where: {
      users: {
        some: {
          id: params.userId,
        },
      },
    },
  });
  // const badges = [
  //   { id: 1, src: "/profileImg.png", alt: "Badge 1" },
  //   { id: 2, src: "/profileImg.png", alt: "Badge 2" },
  //   { id: 3, src: "/profileImg.png", alt: "Badge 3" },
  //   { id: 4, src: "/profileImg.png", alt: "Badge 4" },
  // ];

  const selectedBadge = {
    id: 1,
    src: "/profileImg.png",
    alt: "First Match Badge",
    title: "First Match",
    description: "Congratulations!\nYou completed your first match.",
    acquired: "21.08.2024",
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 font-sans">
      <div className="mb-4">
        <Link href="/profile">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <h1 className="text-xl text-center font-bold pt-8 mb-12">Badges</h1>

      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Your Badges</h2>
        <div className="grid grid-cols-4 gap-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="w-16 h-16 bg-white rounded-full overflow-hidden"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={64}
                height={64}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Badge Detail</h2>
        <div className="flex items-center mb-2">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden mr-4">
            <Image
              src={selectedBadge.src}
              alt={selectedBadge.alt}
              width={64}
              height={64}
              objectFit="cover"
            />
          </div>
          <span className="font-semibold">{selectedBadge.title}</span>
        </div>
        <h3 className="font-semibold mb-1">Description</h3>
        <div className="bg-gray-100 border border-black p-3 rounded-lg">
          {selectedBadge.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Acquired: {selectedBadge.acquired}
        </p>
      </div>
    </div>
  );
}
