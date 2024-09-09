import { protectPage } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await protectPage();
  redirect(`/profile/${user.id}`);
}
