"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const friendsImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function AvatarList() {
  return (
    <div>
      <Separator className="mt-2 mb-5 w-full" />
      <div className="flex justify-between w-full items-center px-5 mb-5">
        <div className="flex">
          {friendsImages.map((url, index) => (
            <Avatar
              key={index}
              className={`w-10 h-10 overflow-hidden relative ring-2 ring-white ${
                index !== 0 ? "-ml-2" : ""
              } z-[${10 - index}]`}
            >
              <AvatarImage
                src={url}
                alt={`friend-image-${index}`}
                className="w-full h-full object-cover"
              />
            </Avatar>
          ))}
          <Avatar className="h-10 w-10 -ml-2 ring-2 ring-white">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>+15</AvatarFallback>
          </Avatar>
        </div>
        <Link href="/profile/friends">
          <LuArrowRight className="size-5" />
        </Link>
      </div>
      <Separator className="my-5" />
    </div>
  );
}
