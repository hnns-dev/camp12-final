import React from "react";
import { ProfileForm } from "./ProfileForm";
import { protectPage } from "@/lib/auth";

export default async function page() {
  const user = await protectPage();

  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
}
