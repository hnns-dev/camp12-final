"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProfile = async (
  userId: string,
  name: string,
  email: string,
  imageUrl: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      picture: imageUrl,
    },
  });
  revalidatePath(`/profile/${userId}`);
  redirect("/profile/me");
};
