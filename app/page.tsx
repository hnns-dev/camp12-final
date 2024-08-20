import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProfileUpdatePage } from "@/components/profile-update-page";

export default function Home() {
  return (
    <div>
      <ProfileUpdatePage />
    </div>
  );
}
