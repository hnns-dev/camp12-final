import Create from "@/components/create";
import { prisma } from "@/lib/db";
import { useState } from "react";

export default async function CreateMeet() {
  const tags = await prisma.tag.findMany();

  return <Create suggestions={tags} />;
}
