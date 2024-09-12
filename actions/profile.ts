"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  userId: string,
  name: string,
  email: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
    },
  });
  revalidatePath(`/profile/${userId}/update`);
};
