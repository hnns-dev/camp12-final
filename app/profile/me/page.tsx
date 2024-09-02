"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MePage = () => {
  const router = useRouter();
  const ownUserId = "ownUserId";

  useEffect(() => {
    router.push(`/profile/${ownUserId}`);
  }, [ownUserId]);

  return null;
};

export default MePage;
