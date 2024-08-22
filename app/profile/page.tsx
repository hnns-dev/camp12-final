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
import { Ghost } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <div className=" flex justify-between">
        <Link href={`/qr-add-friend`}>
          <Button
            // onClick={redirectClickHandler}
            variant={"ghost"}
          >
            Add Friends
          </Button>
        </Link>
        <Button variant={"ghost"}>
          <img src="/settings.svg" alt="Settings" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>BB</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-lg font-medium">Bensen Bensen</div>
        </div>
        <Link href="#" className="group" prefetch={false}>
          <Card className="w-full max-w-md group-hover:bg-zinc-300">
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              <Avatar className="h-12 w-12 ring-4 ring-background">
                <AvatarImage src="/placeholder-user.jpg" alt="@maxleiter" />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12 ring-4 ring-background ">
                <AvatarImage src="/placeholder-user.jpg" alt="@shuding_" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12 ring-4 ring-background">
                <AvatarImage src="/placeholder-user.jpg" alt="@jaredpalmer" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
        <Link href="#" className="group" prefetch={false}>
          <Card className="w-full max-w-md group-hover:bg-zinc-300">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              <Avatar className="h-12 w-12 ring-4 ring-background">
                <AvatarImage src="/placeholder-user.jpg" alt="@maxleiter" />
                <AvatarFallback>Gold</AvatarFallback>
              </Avatar>

              <Avatar className="h-12 w-12 ring-4 ring-background">
                <AvatarImage src="/placeholder-user.jpg" alt="@shuding_" />
                <AvatarFallback>Silver</AvatarFallback>
              </Avatar>

              <Avatar className="h-12 w-12 ring-4 ring-background">
                <AvatarImage src="/placeholder-user.jpg" alt="@jaredpalmer" />
                <AvatarFallback>Silver</AvatarFallback>
              </Avatar>
            </CardContent>
            <CardFooter className=""> </CardFooter>
          </Card>
        </Link>
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
