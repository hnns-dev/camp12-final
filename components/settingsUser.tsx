"use client";

import { useState } from "react";
import { updateSettings } from "@/actions/settings";

type Props = {
  userId: string;
};

export default function SettingsUser({ userId }: Props) {
  // State to hold the selected options for both settings categories
  const [friendsListSetting, setFriendsListSetting] = useState("PRIVATE");
  const [profileSetting, setProfileSetting] = useState("FRIENDS_ONLY");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault;
    await updateSettings({
      friendsVisible: friendsListSetting,
      profileVisible: profileSetting,
      userId,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Top bar with back arrow */}
      <div className="w-full flex items-center mb-8">
        <button className="text-2xl ml-2">←</button>
        <h1 className="flex-1 text-center text-2xl font-bold">Settings</h1>
      </div>

      {/* Friends List setting */}
      <div className="w-full max-w-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Friends list</h2>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="friendsList"
              value="Private"
              checked={friendsListSetting === "PRIVATE"}
              onChange={() => setFriendsListSetting("PRIVATE")}
              className="mr-2"
            />
            Private
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="friendsList"
              value="Only friends"
              checked={friendsListSetting === "FRIENDS_ONLY"}
              onChange={() => setFriendsListSetting("FRIENDS_ONLY")}
              className="mr-2"
            />
            Only friends
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="friendsList"
              value="Public"
              checked={friendsListSetting === "PUBLIC"}
              onChange={() => setFriendsListSetting("PUBLIC")}
              className="mr-2"
            />
            Public
          </label>
        </div>
      </div>

      {/* Profile setting */}
      <div className="w-full max-w-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="profile"
              value="Private"
              checked={profileSetting === "PRIVATE"}
              onChange={() => setProfileSetting("PRIVATE")}
              className="mr-2"
            />
            Private
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="profile"
              value="Only friends"
              checked={profileSetting === "FRIENDS_ONLY"}
              onChange={() => setProfileSetting("FRIENDS_ONLY")}
              className="mr-2"
            />
            Only friends
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="profile"
              value="Public"
              checked={profileSetting === "PUBLIC"}
              onChange={() => setProfileSetting("PUBLIC")}
              className="mr-2"
            />
            Public
          </label>
        </div>
      </div>

      {/* Save settings button */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white font-bold py-2 px-6 rounded-full"
      >
        Save settings
      </button>
    </div>
  );
}
