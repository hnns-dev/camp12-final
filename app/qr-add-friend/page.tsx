import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QRPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-4">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 flex flex-col justify-between flex-grow">
        <div className="flex justify-start mb-6">
          <Link href="/profile/friends">
            <ArrowLeft className="text-black w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-col items-center flex-grow justify-center">
          <h1 className="text-3xl font-bold text-center mb-2">
            let's become friends
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Share the code and
            <br />
            grow your own community
          </p>
          <div className="m-14">
            <img
              src="/QRcode.svg"
              alt="QR Code"
              width={200}
              height={200}
              className="w-48 h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
