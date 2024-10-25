import React from "react";
import { motion } from "framer-motion";

export default function MapPointer() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus text-teal-900"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </motion.svg>
  );
}
