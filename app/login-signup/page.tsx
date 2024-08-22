import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="h-screen flex flex-col items-center bg-white">
      <img
        className="w-screen h-1/2 object-cover object-left"
        src="signin-hero.jpg"
        alt="Person sitting on a ping pong table"
      />
      <div className="flex h-1/2 flex-col items-center p-5 justify-evenly mb-6">
        <h1 className="flex-1 text-center text-3xl font-semibold pt-12">
          Hi there!
        </h1>
        <h2 className="flex-1 text-center text-sm text-muted-foreground pt-2 pr-8 pl-8">
          Spin, Smash, Socialize Discover Ping Pong Partners Near You!
        </h2>
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="flex flex-col w-full gap-3">
            <Input className="mt-12" placeholder="your@mail.com" />
            <Button
              variant={"default"}
              className="w-full text-base font-semibold"
            >
              Sign in with email
            </Button>
          </div>
          <hr className="solid"></hr>
          <div className="w-full flex gap-1 items-center">
            <div className="h-px bg-muted-foreground/20 flex-1"></div>
            <p className="text-muted-foreground">or continue with</p>
            <div className="h-px bg-muted-foreground/20 flex-1"></div>
          </div>
          <hr className="solid"></hr>
          <div className=" w-full flex flex-col justify-evenly mb-11">
            <Button variant={"outline"} className=" text-base font-semibold">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1713 9.368H18.5V9.33341H11V12.6667H15.7096C15.0225 14.6072 13.1763 16.0001 11 16.0001C8.23877 16.0001 6.00002 13.7613 6.00002 11.0001C6.00002 8.23883 8.23877 6.00008 11 6.00008C12.2746 6.00008 13.4342 6.48091 14.3171 7.26633L16.6742 4.90925C15.1859 3.52216 13.195 2.66675 11 2.66675C6.39794 2.66675 2.66669 6.398 2.66669 11.0001C2.66669 15.6022 6.39794 19.3334 11 19.3334C15.6021 19.3334 19.3334 15.6022 19.3334 11.0001C19.3334 10.4413 19.2759 9.89591 19.1713 9.368Z"
                  fill="#FFC107"
                />
                <path
                  d="M3.38177 6.99199L6.21096 9.06683C6.97648 7.17153 8.83046 5.83336 11 5.83336C12.3171 5.83336 13.5153 6.33022 14.4277 7.14182L16.8633 4.70617C15.3254 3.27285 13.2682 2.38892 11 2.38892C7.6925 2.38892 4.82414 4.25624 3.38177 6.99199Z"
                  fill="#FF3D00"
                />
                <path
                  d="M11 19.6112C13.2243 19.6112 15.2453 18.76 16.7733 17.3758L14.1082 15.1205C13.2437 15.7754 12.169 16.1668 11 16.1668C8.76028 16.1668 6.85851 14.7386 6.14207 12.7456L3.33398 14.9091C4.75912 17.6979 7.65332 19.6112 11 19.6112Z"
                  fill="#4CAF50"
                />
                <path
                  d="M19.4436 9.31357H18.75V9.27783H11V12.7223H15.8666C15.5256 13.6854 14.906 14.516 14.1069 15.1209L14.1082 15.12L16.7733 17.3753C16.5847 17.5467 19.6111 15.3056 19.6111 11.0001C19.6111 10.4227 19.5517 9.85908 19.4436 9.31357Z"
                  fill="#1976D2"
                />
              </svg>
              <div className="w-2"></div>
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
