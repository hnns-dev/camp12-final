import { protectPage } from "@/lib/auth";
import { redirect } from "next/navigation";

const MePage = async () => {
  const user = await protectPage();

  redirect(`/profile/${user.id}`);

  return null;
};

export default MePage;
