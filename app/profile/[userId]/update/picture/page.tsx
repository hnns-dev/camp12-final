import { updatePicture } from "@/actions/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export default async function ChangePicturePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await prisma.user.findUnique({ where: { id: params.userId } });
  return (
    <form action={updatePicture}>
      <Avatar className="object-cover">
        <AvatarImage src={user?.picture || ""} />
        <AvatarFallback>BB</AvatarFallback>
      </Avatar>
      <input type="hidden" name="userId" value={user?.id} />
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        Avatar
      </label>
      <input type="file" className="mb-4" name="image" />
      <Button>Upload Picture</Button>
    </form>
  );
}
