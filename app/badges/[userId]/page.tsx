import { prisma } from "@/lib/db";
import BadgesForm from "../badgesForm";

export default async function BadgesComponent({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  // Example badge data - replace with your actual data

  const badges = await prisma.badge.findMany({
    where: {
      users: {
        some: {
          id: params.userId,
        },
      },
    },
  });

  // const badges = [
  //   { id: 1, src: "/profileImg.png", alt: "Badge 1" },
  //   { id: 2, src: "/profileImg.png", alt: "Badge 2" },
  //   { id: 3, src: "/profileImg.png", alt: "Badge 3" },
  //   { id: 4, src: "/profileImg.png", alt: "Badge 4" },
  // ];

  // const selectedBadge = {
  //   id: 1,
  //   src: "/profileImg.png",
  //   alt: "First Match Badge",
  //   title: "First Match",
  //   description: "Congratulations!\nYou completed your first match.",
  //   acquired: "21.08.2024",
  // };

  return <BadgesForm badges={badges} />;
}
