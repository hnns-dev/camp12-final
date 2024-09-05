import { Button } from "@/components/ui/button";
import { LuArrowLeft } from "react-icons/lu";

export default function CheckEmail() {
  return (
    <section className="bg-zinc-100 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-12 min-h-[90vh] bg-zinc-100 pb-20">
        <img src="/email.svg" alt="Check your email" className="w-36 h-36" />
        <h1 className="font-bold text-2xl">Check your email</h1>
        <div className="px-20 mb-20 gap-5 flex flex-col">
          <p
            className="text-lg font-semibold text-center
          "
          >
            We sent you an email with a magic link to login.
          </p>
          <p
            className="text-lg font-semibold text-center
          "
          >
            You can close this page now.
          </p>
        </div>
      </div>
    </section>
  );
}
