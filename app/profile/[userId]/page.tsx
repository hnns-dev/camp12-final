import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { User, Badge } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LuArrowRight } from "react-icons/lu";
import HeaderNav from "@/components/HeaderNav";
import { CalendarDaysIcon } from "lucide-react";
import Link from "next/link";

interface UserData extends User {
  badges: Badge[];
}

const friendsImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function ProfileContent({ userData }: { userData: UserData }) {
  return (
    <div>
      <HeaderNav />
      <div className="flex flex-col items-center pt-5">
        <Avatar className="h-40 w-40">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>
        <div className="pt-4 text-lg font-semibold">{userData.name}</div>
        <div className="mt-2 text-sm text-muted-foreground px-11 text-center pt-3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.
        </div>
        <div className="mt-2 text-sm text-muted-foreground px-11 text-center pt-3">
          Leipzig
        </div>
        <Separator className="my-5" />
        <div className="w-full px-4">
          <div className="flex overflow-x-auto py-2 space-x-4 scrollbar-hide">
            {userData.badges.map((badge, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={badge.icon || undefined}
                  alt={badge.name}
                  className="w-12 h-12 object-contain"
                  title={badge.name}
                />
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-5" />

        <div className="flex justify-between w-full items-center px-5 mb-5">
          <div className="flex">
            {friendsImages.map((url, index) => (
              <Avatar
                key={index}
                className={`w-10 h-10 overflow-hidden relative ring-2 ring-white ${
                  index !== 0 ? "-ml-2" : ""
                } z-${10 - index}`}
              >
                <img
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
          <Link href={"/profile/friends"}>
            <LuArrowRight className="size-5" />
          </Link>
        </div>
        <Button
          variant="secondary"
          className="self-stretch text-center block ml-5 mr-5"
          asChild
        >
          <Link href={"/qr-add-friend"}>Add Friend</Link>
        </Button>

        <Separator className="my-5" />
        <div className="flex items-center w-full justify-between px-5">
          <p className="font-semibold">Sessions</p>
          <Button className="text-xs underline" variant="link">
            view all
          </Button>
        </div>
        <div className="grid grid-cols-5 self-stretch p-4 gap-4 m-5 shadow-md">
          <img
            className="max-h-full object-cover col-span-2 rounded-md"
            src="signin-hero.jpg"
            alt="Person sitting on a ping pong table"
          />
          <div className="flex flex-col justify-center col-span-3 gap-1">
            <p className="font-semibold text-sm">Ping Pong</p>
            <p className="text-sm">Erich-Zeigner-Allee 64b</p>
            <div className="flex flex-row gap-2 items-center">
              <CalendarDaysIcon className="text-muted-foreground size-4" />

              <p className="text-xs text-muted-foreground">August 24th 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const userData = await prisma.user.findUnique({
    where: { id: params.userId },
    include: { badges: true },
  });

  if (!userData) {
    notFound();
  }

  return <ProfileContent userData={userData} />;
}
