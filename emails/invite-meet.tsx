import { Tailwind, Hr, Button } from "@react-email/components";
import { User } from "lucide-react";
import * as React from "react";

export const InviteMeetEmail = ({ meetId }: { meetId: string }) => (
  <Tailwind>
    <div className="flex-col font-sans text-zinc-800 mt-5">
      <img src="https://img.logoipsum.com/261.svg" alt="logo" />
      <Hr className="mt-5" />
      <div className="mx-5">
        <h1 className="text-2xl">Hello Friend</h1>
        <p className="leading-8 text-md">
          Hey {"friend"}, you've been invited to a new meet! We would love to
          see you there 🤓
        </p>
        <p className="text-xs text-zinc-500">
          —click the link below to join the meet:
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            className="box-border rounded-[8px] bg-[#073B4C] px-[40px] py-[12px] text-center font-semibold text-white"
            // href={urlString}
          >
            Join Meet
          </Button>
        </div>
      </div>
      <Hr className="mt-5" />
      <p className="text-xs text-zinc-500">
        If you are not interested in this meet, please ignore this email 😉
      </p>
    </div>
  </Tailwind>
);

export default InviteMeetEmail;
