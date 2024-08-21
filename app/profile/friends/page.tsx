import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TbXboxX } from "react-icons/tb";

type Friend = {
  username: string;
  picture: string;
};
const friends = [
  { username: "Kathryn_Janeway", picture: "/picture.jpg" },
  { username: "JeanLuc_P", picture: "/picture2.jpg" },
  { username: "Will_Riker", picture: "/picture3.jpg" },
  { username: "Worf", picture: "/picture4.jpg" },
];

export default function Component() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <Link href="/qrcode">Create QR-Code</Link>
        <Link href="/update-profile">Edit Profile</Link>
      </div>
      <h1 className="text-3xl font-bold m-5">Friends</h1>
      {friends.map((friend: Friend, index) => (
        <Card className="m-3" key={index}>
          <CardContent className="bg-secondary rounded-lg border p-4 flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-12 h-12 bg-primary">
                <AvatarImage src={friend.picture} />
                <AvatarFallback>{friend.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-base font-medium">{friend.username}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Button variant="outline" size="sm">
                Invite to Game
              </Button>
              <Button variant="outline" size="sm">
                Give Badge
              </Button>
            </div>
            <Button variant="outline" className="gap-2 mr-2">
              <p>delete</p>
              <TbXboxX></TbXboxX>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
