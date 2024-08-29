import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER, // SMTP configuration
      from: process.env.EMAIL_FROM, // Sender email address
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Add user ID to session object
      return session;
    },
  },
});
