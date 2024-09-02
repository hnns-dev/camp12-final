import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { protectPage } from "@/lib/auth";

export default async function Protected() {
  const user = await protectPage();

  return (
    <div className="flex flex-col gap-4 items-center p-8">
      <Avatar>
        <AvatarImage src={user.picture ?? undefined} />
        <AvatarFallback>UU</AvatarFallback>
      </Avatar>
      <p>Hello {user.email}</p>
    </div>
  );
}
