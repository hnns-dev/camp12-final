import { Meet as PrismaMeet, Venue as PrismaVenue } from "@prisma/client";

export type Filters = {
  activity?: string;
  status?: string;
  competitive?: "yes" | "no" | "both";
};

export type Venue = PrismaVenue & {
  activityTypes: { name: string }[];
  meets: PrismaMeet[];
};
export type Meet = PrismaMeet & {
  activityType: { name: string };
};

export type ActionResult = {
  error: string | null;
};
