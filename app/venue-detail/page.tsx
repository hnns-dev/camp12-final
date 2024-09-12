import Image from "next/image";
import { prisma } from "@/lib/db";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardIcon } from "lucide-react";

export default async function VenueDetailsPage() {
  const venueId = "a9f7dd25-b7b9-47aa-8818-bdd170d520d9";
  const venue = await prisma.venue.findUnique({
    where: { id: venueId },
    select: {
      name: true,
      location: true,
      image: true,
      address: true,
      description: true,
      tags: {
        select: { name: true },
      },
      reports: {
        select: {
          issue: true,
        },
      },
    },
  });
  const tournaments = await prisma.tournament.findMany({
    where: { venueId: venueId },
    select: {
      name: true,
      time: true,
      date: true,
    },
  });

  const meets = await prisma.meet.findMany({
    where: { venueId: venueId },
    select: {
      date: true,
      time: true,
      isPublic: true,
    },
  });

  // handle an undefined case
  const coordinates: number[] | undefined = venue?.location;
  let address: string;
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    // desctructure the array which is lat and lng
    const [lat, lng] = coordinates;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }
    const data = await response.json();
    address = data.display_name;
  } else {
    <small>Cant show the location</small>;
    throw new Error("The coordinates are undefined or in wrong format");
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="flex items-center justify-between space-x-4 w-full">
        <button className="flex text-lg">←</button>
        <h2 className=" flex text-lg font-bold">Venue</h2>
        <button className="flex text-lg">→</button>
      </div>

      {/* Venue Name */}
      <div className="relative flex justify-center items-center w-5/6">
        <h1 className="truncate cursor-pointer text-muted-foreground group">
          {address}
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 p-2 shadow-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-normal z-10">
            {address}
          </div>
        </h1>
      </div>

      {/* Venue Image */}
      <div className="relative w-full max-w-md">
        <Image
          src={venue?.image!}
          alt="Venue Image"
          className="rounded-lg"
          layout="responsive"
          width={640}
          height={320}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {venue?.tags.map((tag, index) => (
          <small
            key={index}
            className="flex justify-center items-center w-auto py-0.5 px-2 h-auto rounded-full border-2 text-xs bg-gray-300 text-gray-600 shadow-sm border-gray-400"
          >
            {tag.name}
          </small>
        ))}
      </div>

      {/* Description */}
      <div className="flex h-auto max-h-40 w-full rounded border-2 border-input bg-gray-100 px-3 py-2 text-sm text-gray-500 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70">
        <p>{venue?.description}</p>
      </div>

      {/* Tournaments on this Place */}
      <div className="w-full">
        <h3 className="text-sm text-gray-500 font-bold py-2">Tournaments</h3>
        <div className="flex gap-2 h-auto min-h-36 max-h-40 w-full rounded border-2 border-input bg-gray-100 px-3 py-2 text-sm text-gray-500 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 overflow-scroll">
          {tournaments.map((tournament, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{tournament.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col mb-1">
                  <Label>Date</Label>
                  <p>{tournament.date.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <Label>Time</Label>
                  <p className="text-left">{tournament.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Planned Event */}
      <div className="w-full">
        <h3 className="text-sm text-gray-500 font-bold py-2">Meets</h3>
        <div className="flex gap-2 h-auto min-h-36 max-h-40 w-full rounded border-2 border-input bg-gray-100 px-3 py-2 text-sm text-gray-500 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 overflow-scroll">
          {meets.map((meet, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{meet.isPublic ? "Public" : "Private"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col mb-1">
                  <Label>Date</Label>
                  <p>{meet.date.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <Label>Time</Label>
                  <p className="text-left">{meet.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
