import { z } from "zod";

export const meetSchema = z.object({
  activityType: z.enum(["Tennis", "Basketball"], {
    required_error: "Choose a Sport",
  }),
  mode: z.enum(["softie", "casual", "competetive"], {
    required_error: "Choose a Mode",
  }),
  // tournamentType: z.enum(["single", "round"], {
  //   required_error: "Choose a tournament type",
  // }),
  public: z.boolean(),
  date: z.date({ required_error: "Date is required" }),
  time: z.string({ required_error: "Time is required" }),
  duration: z.number(),
  participants: z.string().refine(
    (val) => {
      let n = Number(val);
      return !isNaN(n) && val.length > 0;
    },
    {
      message: "Invalid number",
    }
  ),
  competitive: z.boolean(),
  recurring: z.boolean(),
  equipment: z.string().trim().optional(),
  description: z.string().trim().optional(),
});
