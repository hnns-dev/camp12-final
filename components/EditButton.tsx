"use client";

import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

type EditProps = {
  creatorId: string;
  userId: string;
};
export function EditButton({ creatorId, userId }: EditProps) {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(userId === creatorId);
  }, [userId, creatorId]);

  return (
    <div>
      <FaRegEdit className="fill-slate-900 size-5" />
    </div>
  );
}
