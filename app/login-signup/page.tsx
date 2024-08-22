import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col p-4 min-h-screen justify-start">
      <div className="min-h-screen flex flex-col items-center justify-between bg-white p-4">
        {/* Top bar with back arrow */}
        <div className="w-full flex items-center mb-8">
          <button className="text-2xl ml-2">←</button>
        </div>
        <div>
          <h1 className="flex-1 text-center text-3xl font-extrabold">
            Welcome
          </h1>
          <h2 className="flex-1 text-center text-sm font-medium">
            Login or Sign-up
          </h2>
        </div>
        <div className="flex flex-col justify-between items-center gap-16 w-full pb-8">
          <div className="flex flex-col gap-4 w-full">
            <Input placeholder="E-Mail-address" />
            <Button
              variant={"outline"}
              className="w-full text-base font-semibold rounded-full"
            >
              Login or Sign-up
            </Button>
          </div>

          <strong>Or</strong>
          <Button
            variant={"outline"}
            className="w-full text-base font-semibold rounded-full"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
