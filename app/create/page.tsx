import Create from "@/components/create";
import { Tag } from "@prisma/client";

type Props = {
  tag: Tag;
};
export default function CreateMeet({ tag }: Props) {
  return <Create tag={tag} />;
}
