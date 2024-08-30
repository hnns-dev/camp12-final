import { lucia } from "lucia";
import { prisma } from "./db"; // Import your Prisma client

// Initialize Lucia with Prisma
const auth = lucia({
  adapter: prisma,
  generateUserId: async () => {
    // Custom function to generate user ID
    return `user_${Date.now()}`;
  },
  sessionTimeout: 60 * 60 * 24 * 7, // 1 week
});

export { auth };
