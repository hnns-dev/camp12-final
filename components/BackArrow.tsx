"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  variant?: "button" | "link";
  className?: string;
};

export function BackArrow({ variant = "button", className = "" }: Props) {
  const router = useRouter();

  return (
    <button
      className={cn(
        "rounded-lg p-2.5 max-w-sm",
        variant === "button" ? "bg-white/80" : "bg-transparent",
        className
      )}
      onClick={() => router.back()}
    >
      <ArrowLeft className="text-black size-6" />
    </button>
  );
}
