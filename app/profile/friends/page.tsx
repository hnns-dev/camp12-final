/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nCswiI8nic6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbXboxX } from "react-icons/tb";

export default function Component() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Friends</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-background rounded-lg border p-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" alt="Friend 1" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium">John Doe</p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Button variant="outline" size="sm">
              Invite to Game
            </Button>
            <Button variant="outline" size="sm">
              Give Badge
            </Button>
          </div>
          <Button variant="outline" className="gap-2">
            <p>delete</p>
            <TbXboxX></TbXboxX>
          </Button>
        </div>
      </div>
    </div>
  );
}
