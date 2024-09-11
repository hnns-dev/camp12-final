import { z } from "zod";

export const meetSchema = z.object({
  activityType: z.string().min(1, "Choose a Sport"),
  // mode: z.enum(["softie", "casual", "competetive"], {
  //   required_error: "Choose a Mode",
  // }),
  // tournamentType: z.enum(["single", "round"], {
  //   required_error: "Choose a tournament type",
  // }),
  public: z.boolean(),
  date: z.date({ required_error: "Date is required" }),
  time: z.string({ required_error: "Time is required" }),
  mode: z.enum(["softie", "casual", "competetive"], {
    required_error: "Choose a Mode",
  }),
  duration: z.number(),
  // change participants to guests
  guests: z.number(),
  // competitive: z.boolean(),
  recurring: z.boolean(),
  equipment: z.string().trim().optional(),
  description: z.string().trim().optional(),
});
