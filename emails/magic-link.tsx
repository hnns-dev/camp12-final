import { Tailwind, Hr, Button } from "@react-email/components";
import { User } from "lucide-react";
import * as React from "react";

interface EmailTemplateProps {
  urlString: string;
  name?: string;
  isNewUser: boolean;
}

export const MagicLinkTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  urlString,
  name,
  isNewUser,
}) => (
  <Tailwind>
    <div className="flex-col font-sans text-zinc-800 mt-5">
      <img src="https://img.logoipsum.com/261.svg" alt="logo" />
      <Hr className="mt-5" />
      <div className="mx-5">
        <h1 className="text-2xl">
          {isNewUser ? "Welcome to Bounce 👋" : "Welcome back to Bounce 👋"}
        </h1>
        <p className="leading-8 text-md">
          Hey {name || "friend"},
          {isNewUser
            ? "we're excited to have you on board! You're just a few steps away from your new hub for effortless sports meetups. Let's get you set up!"
            : "great to see you again! Use the link below to securely log in and jump right back in."}
        </p>
        <p className="text-xs text-zinc-500">
          —click the link below to securely log in{" "}
          {isNewUser ? "and start using Bounce" : "and access your account"}
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            className="box-border rounded-[8px] bg-[#073B4C] px-[40px] py-[12px] text-center font-semibold text-white"
            href={urlString}
          >
            {isNewUser ? "Verify your Account" : "Log In"}
          </Button>
        </div>
      </div>
      <Hr className="mt-5" />
      {isNewUser && (
        <>
          <div className="m-5">
            <h2 className="text-2xl">Get started</h2>
            <h3 className="text-sm">Find new locations</h3>
            <p className="text-sm">
              Discover new places for sport activities on our{" "}
              <span>
                <a href="http://localhost:3000/">Map</a>
              </span>
            </p>
            <h3 className="text-sm">Find people to play with</h3>
            <p className="text-sm">
              Just invite your friends or search for sessions that are open to
              join.
            </p>
            <h3 className="text-sm">Schedule a meeting</h3>
            <p className="text-sm">
              Select your vanue of choice, click on create meet, set everything
              your need for your next session an invite everyone you like.
            </p>
            <div>
              <h3 className="text-sm">Have fun</h3>
              <p className="text-sm">
                Enjoy time with friends and new people at your next match.
              </p>
            </div>
          </div>
          <Hr className="mt-5" />
        </>
      )}
      <p className="text-xs text-zinc-500">
        If you did not try to log in, please ignore this email
      </p>
    </div>
  </Tailwind>
);

export default MagicLinkTemplate;

// @ts-ignore
MagicLinkTemplate.PreviewProps = { isNewUser: true };
