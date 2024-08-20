import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function QRCodeInvite() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <ArrowLeft className="text-black w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          lets become friends
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Share the code and
          <br />
          grow your own community
        </p>
        <div className="flex justify-center mb-4">
          <Image
            src="/api/placeholder/200/200"
            alt="QR Code"
            width={200}
            height={200}
            className="w-48 h-48"
          />
        </div>
      </div>
    </div>
  );
}
