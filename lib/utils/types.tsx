import { Meet, Venue as PrismaVenue } from "@prisma/client";

export type Filters = {
  activity?: string;
  status?: string;
  competitive?: "yes" | "no" | "both";
};

export type Venue = PrismaVenue & {
  activityTypes: { name: string }[];
  meets: Meet[];
};
