import { Google } from "arctic";

const prefix = process.env.NODE_ENV === "production" ? "https://" : "http://";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  prefix + process.env.VERCEL_URL + "/api/oauth/google/callback"
);
