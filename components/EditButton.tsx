"use client";

import { useEffect, useState } from "react";

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
    <div className="flex flex-row justify-end pb-8 w-full h-6">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`align-right ${isCreator ? "flex" : "hidden"}`}
      >
        <path
          d="M18 2L22 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 20.5L19 9L15 5L3.5 16.5L2 22L7.5 20.5Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
