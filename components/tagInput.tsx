import { Tag } from "@prisma/client";
import { prisma } from "@/lib/db";

interface TagsProps {
  tag: Tag;
}

export default async function TagInput({ tag }: TagsProps) {
  const tags = await prisma.tag.findMany({
    where: { name: tag.name },
  });

  console.log(tags);

  return tags;
}
