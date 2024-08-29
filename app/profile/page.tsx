"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LuArrowRight } from "react-icons/lu";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import HeaderNav from "@/components/HeaderNav";

const friendsImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function ProfilePage() {
  return (
    <div>
      <HeaderNav />
      <div className="flex flex-col items-center pt-5">
        <Avatar className="h-40 w-40">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>
        <div className="pt-4 text-lg font-semibold">Sam Jones</div>
        <div className="mt-2 text-sm text-muted-foreground px-11 text-center pt-3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.
        </div>
        <div className="mt-2 text-sm text-muted-foreground px-11 text-center pt-3">
          Leipzig
        </div>
        <Separator className="my-5" />
        <div className="flex px-4 justify-around w-full items-center">
          <svg
            width="44"
            height="26"
            viewBox="0 0 44 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_417_1198)">
              <path
                d="M38.4521 0.162842H5.49303L0 14.8112L21.973 25.7973L43.9451 14.8112L38.4521 0.162842Z"
                fill="#293838"
              />
              <path
                d="M36.76 2.60376H7.18512L3.05768 13.6103L21.973 23.067L40.8875 13.6103L36.76 2.60376ZM36.4781 3.0112L40.3777 13.4103L21.973 22.6121L3.56744 13.4103L7.46698 3.0112H36.4781Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_417_1198">
                <rect
                  width="44"
                  height="25.6744"
                  fill="white"
                  transform="translate(0 0.162842)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="45"
            height="42"
            viewBox="0 0 45 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_408_1170)">
              <path
                d="M13.1408 12.4531V41.7647L22.4435 34.7874L31.7462 41.7647V12.4531H13.1408Z"
                fill="#E09500"
              />
              <path
                d="M44.3869 0.16748H0.5L22.4435 30.1735L44.3869 0.16748Z"
                fill="#293838"
              />
              <path
                d="M36.7939 4.02173H8.09308L22.4435 23.6435L36.7939 4.02173ZM35.1064 4.87837L22.4435 22.1932L9.78056 4.87837H35.1064Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_408_1170">
                <rect
                  width="44"
                  height="41.6648"
                  fill="white"
                  transform="translate(0.5 0.16748)"
                />
              </clipPath>
            </defs>
          </svg>

          <svg
            width="44"
            height="30"
            viewBox="0 0 44 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_408_1175)">
              <path
                d="M0.494036 6.64307L2.38441 11.119L0 12.7279C2.38526 14.3554 7.45256 15.9054 11.7128 16.4227V10.0642C7.42254 9.61586 3.21209 7.84762 0.494036 6.64307Z"
                fill="#E09500"
              />
              <path
                d="M4.55865 11.4938L11.7127 10.063V14.3554L4.55865 11.4938Z"
                fill="#C17B00"
              />
              <path
                d="M43.5008 6.64307L41.6104 11.119L43.9949 12.7279C41.6104 14.3554 36.5432 15.9054 32.283 16.4227V10.0642C36.5732 9.61586 40.7828 7.84762 43.5008 6.64307Z"
                fill="#E09500"
              />
              <path
                d="M39.437 16.3227L32.283 10.063V14.3554L39.437 16.3227Z"
                fill="#C17B00"
              />
              <path
                d="M37.5561 14.9821C37.5561 23.1434 30.9406 29.7595 22.7788 29.7595C14.6178 29.7595 8.00146 23.1434 8.00146 14.9821C8.00146 6.82071 14.6178 0.20459 22.7788 0.20459C30.9406 0.20459 37.5561 6.82071 37.5561 14.9821Z"
                fill="#293838"
              />
              <path
                d="M22.7788 27.3727C15.9464 27.3727 10.3885 21.8142 10.3885 14.982C10.3885 8.14972 15.9464 2.59131 22.7788 2.59131C29.6113 2.59131 35.17 8.14972 35.17 14.982C35.17 21.8142 29.6113 27.3727 22.7788 27.3727Z"
                fill="#293838"
              />
              <path
                d="M22.7788 2.23364C15.75 2.23364 10.0308 7.95253 10.0308 14.982C10.0308 22.0114 15.75 27.7303 22.7788 27.7303C29.8085 27.7303 35.5277 22.0114 35.5277 14.982C35.5277 7.95253 29.8085 2.23364 22.7788 2.23364ZM22.7788 2.94905C29.414 2.94905 34.8123 8.34698 34.8123 14.982C34.8123 21.617 29.414 27.0149 22.7788 27.0149C16.1436 27.0149 10.7461 21.617 10.7461 14.982C10.7461 8.34698 16.1436 2.94905 22.7788 2.94905Z"
                fill="white"
              />
              <path
                d="M39.4344 18.2902C35.7412 19.7019 29.6687 21.5091 21.9991 21.5094C14.3261 21.5099 8.25277 19.7022 4.55865 18.2902V11.4939C8.00403 12.9693 14.1203 15.0713 21.9991 15.0709C29.8754 15.0705 35.9899 12.9692 39.4344 11.4939V18.2902Z"
                fill="#F5AC09"
              />
            </g>
            <defs>
              <clipPath id="clip0_408_1175">
                <rect
                  width="44"
                  height="29.5906"
                  fill="white"
                  transform="translate(0 0.20459)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_417_1185)">
              <path
                d="M22.4613 41.3781L27.4173 33.9238L36.1912 35.691L34.4243 26.9179L41.8782 21.9614L34.4243 17.0047L36.1912 8.23158L27.4173 9.99874L22.4613 2.54443L17.5042 9.99874L8.73153 8.23158L10.4984 17.0046L3.04449 21.9612L10.4984 26.9178L8.73153 35.691L17.5042 33.9238L22.4613 41.3781Z"
                fill="white"
              />
              <path
                d="M22.4613 6.14502L18.4229 12.219L11.2806 10.7801L12.7188 17.9227L6.6452 21.9614L12.7188 25.9999L11.2806 33.1425L18.4229 31.704L22.4613 37.7776L26.4998 31.7039L33.6421 33.1425L32.2039 25.9999L38.2775 21.9616L32.2039 17.9227L33.6421 10.7801L26.4998 12.219L22.4613 6.14502ZM22.4613 7.57599L25.8404 12.6577L26.1348 13.1008L26.6567 12.9957L32.6302 11.7923L31.4273 17.7663L31.3216 18.2878L31.765 18.5824L36.8472 21.9615L31.765 25.3402L31.3216 25.6347L31.4273 26.1564L32.6302 32.1305L26.6567 30.9271L26.1348 30.8222L25.8404 31.2653L22.4613 36.3468L19.0823 31.2654L18.7878 30.8223L18.266 30.9274L12.2925 32.1305L13.4953 26.1564L13.6011 25.6347L13.1577 25.3402L8.0755 21.9614L13.1577 18.5824L13.6011 18.2878L13.4953 17.7661L12.2925 11.7923L18.266 12.9957L18.7878 13.1008L19.0823 12.6577L22.4613 7.57599Z"
                fill="#293838"
              />
              <path
                d="M4.84429 21.9612L11.608 17.4638L10.0049 9.50514L17.9635 11.1082L22.4613 4.3444L26.9591 11.1082L34.9178 9.50514L33.3147 17.4638L40.0784 21.9615L33.3147 26.4589L34.9178 34.4176L26.9591 32.8144L22.4613 39.5783L17.9635 32.8144L10.0049 34.4176L11.608 26.4589L4.84429 21.9612ZM22.4613 43.9227L28.0676 35.4915L37.9898 37.4904L35.9911 27.5675L44.4227 21.9615L35.9911 16.3553L37.9898 6.43241L28.0676 8.43117L22.4613 0L16.855 8.43117L6.93171 6.43241L8.93048 16.3552L0.5 21.9612L8.93048 27.5674L6.93171 37.4904L16.855 35.4915L22.4613 43.9227Z"
                fill="#293838"
              />
            </g>
            <defs>
              <clipPath id="clip0_417_1185">
                <rect
                  width="44"
                  height="44"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="44"
            height="30"
            viewBox="0 0 44 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_417_1190)">
              <path
                d="M38.8491 0.0454102H5.12909V6.21996H38.8491V0.0454102Z"
                fill="#C17B00"
              />
              <path
                d="M43.9782 5.17542L22.1327 27.0209L17.0027 21.8918L38.8491 0.0454102L43.9782 5.17542Z"
                fill="#F5AC09"
              />
              <path
                d="M26.9755 21.8918L5.12911 0.0454102L0 5.17542L21.8455 27.0209L26.9755 21.8918Z"
                fill="#F5AC09"
              />
              <path
                d="M29.3455 21.7836C29.3455 25.8463 26.0519 29.14 21.9891 29.14C17.9264 29.14 14.6328 25.8463 14.6328 21.7836C14.6328 17.7209 17.9264 14.4272 21.9891 14.4272C26.0519 14.4272 29.3455 17.7209 29.3455 21.7836Z"
                fill="white"
              />
              <path
                d="M21.9891 13.6562C17.5 13.6562 13.8618 17.2944 13.8618 21.7835C13.8618 26.2726 17.5 29.9108 21.9891 29.9108C26.4782 29.9108 30.1164 26.2726 30.1164 21.7835C30.1164 17.2944 26.4782 13.6562 21.9891 13.6562ZM21.9891 15.5562C25.4227 15.5562 28.2164 18.3499 28.2164 21.7835C28.2164 25.2171 25.4227 28.0108 21.9891 28.0108C18.5555 28.0108 15.7618 25.2171 15.7618 21.7835C15.7618 18.3499 18.5555 15.5562 21.9891 15.5562Z"
                fill="#293838"
              />
              <path
                d="M21.9891 16.3027C18.9664 16.3027 16.5082 18.7609 16.5082 21.7836C16.5082 24.8064 18.9664 27.2645 21.9891 27.2645C25.0118 27.2645 27.47 24.8064 27.47 21.7836C27.47 18.7609 25.0118 16.3027 21.9891 16.3027ZM21.9891 16.9355C24.6618 16.9355 26.8373 19.1109 26.8373 21.7836C26.8373 24.4564 24.6618 26.6309 21.9891 26.6309C19.3164 26.6309 17.1418 24.4564 17.1418 21.7836C17.1418 19.1109 19.3164 16.9355 21.9891 16.9355Z"
                fill="#293838"
              />
            </g>
            <defs>
              <clipPath id="clip0_417_1190">
                <rect
                  width="44"
                  height="29.9091"
                  fill="white"
                  transform="translate(0 0.0454102)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Separator className="my-5" />

        <div className="flex justify-between w-full items-center px-5 mb-5">
          <div className="flex">
            {friendsImages.map((url, index) => (
              <Avatar
                key={index}
                className={`w-10 h-10 overflow-hidden relative ${
                  index !== 0 ? "-ml-2" : ""
                } z-${10 - index}`}
              >
                <img
                  src={url}
                  alt={`friend-image-${index}`}
                  className="w-full h-full object-cover"
                />
              </Avatar>
            ))}
            <Avatar className="h-10 w-10 -ml-2">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>+15</AvatarFallback>
            </Avatar>
          </div>
          <Link href={"/profile/friends"}>
            <LuArrowRight className="size-5" />
          </Link>
        </div>
        <Button
          variant="secondary"
          className="self-stretch block ml-5 mr-5"
          asChild
        >
          <Link href={"/qr-add-friend"}>Add Friend</Link>
        </Button>

        <Separator className="my-5" />
        <div className="flex items-center w-full justify-between px-5">
          <p className="font-semibold">Sessions</p>
          <Button className="text-xs underline" variant="link">
            view all
          </Button>
        </div>
        <Card className="grid grid-cols-5 self-stretch p-4 gap-4 m-5 shadow-md">
          <img
            className="max-h-full object-cover col-span-2 rounded-md"
            src="signin-hero.jpg"
            alt="Person sitting on a ping pong table"
          />
          <div className="flex flex-col justify-center col-span-3 gap-1">
            <p className="font-semibold text-sm">Ping Pong</p>
            <p className="text-sm">Erich-Zeigner-Allee 64b</p>
            <div className="flex flex-row gap-2 items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6667 1.33325V3.99992"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33331 1.33325V3.99992"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 6.66675H14"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33331 9.33325H5.34331"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 9.33325H8.01"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6667 9.33325H10.6767"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33331 12H5.34331"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 12H8.01"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6667 12H10.6767"
                  stroke="#64748B"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-xs text-muted-foreground">August 24th 2024</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
