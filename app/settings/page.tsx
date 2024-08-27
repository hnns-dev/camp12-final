import SettingsUser from "@/components/settingsUser";
import { protectPage } from "@/lib/auth";

const UserSettings = async () => {
  const user = await protectPage();
  return <SettingsUser userId={user.id} />;
};

export default UserSettings;
