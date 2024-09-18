"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "./ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Meet, User, Venue, ActivityType } from "@prisma/client";
import { LuMapPin, LuCalendarDays } from "react-icons/lu";
import { Separator } from "./ui/separator";

type ExtendedMeet = Meet & {
  venue: Venue | null;
  activityType: ActivityType;
  distance?: number;
};

interface DrawerUpComingSessionsProps {
  children: React.ReactNode;
  defaultTab: string;
  meets: ExtendedMeet[];
  user: User | null;
}

export function DrawerUpComingSessions({
  children,
  defaultTab,
  user,
  meets,
}: DrawerUpComingSessionsProps) {
  const [sortedMeets, setSortedMeets] = useState<ExtendedMeet[]>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const meetsWithDistance = meets?.map((meet) => {
          let meetLocation =
            meet.location || (meet.venue && meet.venue.location);
          let distance = Infinity;

          if (meetLocation) {
            distance = Math.sqrt(
              Math.pow(latitude - meetLocation[0], 2) +
                Math.pow(longitude - meetLocation[1], 2)
            );
          }

          return {
            ...meet,
            distance: calculateDistance(latitude, longitude, meet),
          }));

        const sorted = meetsWithDistance?.sort(
          (a, b) => a.distance - b.distance
        );
        if (sorted) {setSortedMeets(sorted);}
        
      });
    }
  }, [meets]);

  const calculateDistance = (lat: number, lon: number, meet: ExtendedMeet) => {
    const meetLocation = meet.location || (meet.venue && meet.venue.location);
    if (!meetLocation) return Infinity;

    return Math.sqrt(
      Math.pow(lat - meetLocation[0], 2) + Math.pow(lon - meetLocation[1], 2)
    );
  };

  const ownMeets = sortedMeets.filter((meet) =>
    meet.participants.some((participant) => participant.id === user?.id)
  );

  const renderMeetCards = (meetsToRender: ExtendedMeet[]) => (
    <div className="flex flex-col gap-2 w-full">
      {meetsToRender.map((meet) => (
        <Link href={`/meet/${meet.id}`} key={meet.id}>
          <Card className="px-5 py-3 mt-2 relative w-full hover:bg-gray-50 transition-colors">
            <CardContent className="px-0 py-0">
              <p className="font-semibold text-sm mb-1">
                {meet.activityType.name}
              </p>
              <p className="text-sm mb-2 text-muted-foreground">
                {meet.notes || "No description available"}
              </p>
              <Separator className="my-2"></Separator>
              <div className="flex gap-1 items-center">
                <LuMapPin className="size-4 text-muted-foreground" />
                <p className="text-sm ">
                  {meet.venue?.address ||
                    meet.address ||
                    "No address available"}
                </p>
              </div>
              <div className="flex flex-row justify-between items-center mb-2">
                <div className="flex flex-row gap-1 items-center">
                  <LuCalendarDays className="size-4 text-muted-foreground" />
                  <p className="text-sm">
                    {new Date(meet.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">{meet.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="z-[9999] h-[calc(100vh-16vh)] flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Upcoming meets</DrawerTitle>
          <DrawerDescription className="sr-only">
            Here you can see upcoming public sessions: those near you and those
            you've organized.
          </DrawerDescription>
        </DrawerHeader>
        <Tabs
          defaultValue={defaultTab}
          className="w-[350px] flex flex-col flex-1 mt-4 max-h-full"
        >
          <TabsList className="flex justify-center">
            <TabsTrigger className="flex-1" value="near-me">
              Near me
            </TabsTrigger>
            {user && (
              <TabsTrigger className="flex-1" value="own-meets">
                Own meets
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent
            value="near-me"
            className="py-2 flex-1 overflow-y-scroll"
          >
            <div className="mt-4">
              <label htmlFor="meets" className="font-semibold">
                Public Sessions Near You
              </label>
              {sortedMeets.length > 0 ? (
                renderMeetCards(sortedMeets)
              ) : (
                <p>No public meets found near you.</p>
              )}
            </div>
          </TabsContent>
          {user && (
            <TabsContent
              value="own-meets"
              className="py-2 flex-1 overflow-y-scroll"
            >
              <div className="mt-4">
                <label htmlFor="meets" className="font-semibold">
                  Your Public Sessions
                </label>
                {ownMeets.length > 0 ? (
                  renderMeetCards(ownMeets)
                ) : (
                  <p>You are not participating in any public meets.</p>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
