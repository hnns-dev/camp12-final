import { redirect } from "next/navigation";

const MePage = async () => {
  // const user = await protectPage()
  const ownUserId = "jhvrihll2lalvsug";
  redirect(`/profile/${ownUserId}`);

  return null;
};

export default MePage;
