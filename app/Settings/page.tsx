"use client"; // This marks the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();

  // State to hold the selected options for both settings categories
  const [friendsListSetting, setFriendsListSetting] = useState("Private");
  const [profileSetting, setProfileSetting] = useState("Only friends");

  // Function to handle the form submission
  const handleSubmit = () => {
    console.log({
      friendsList: friendsListSetting,
      profile: profileSetting,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Top bar with back arrow */}
      <div className="w-full flex items-center mb-8">
        <button onClick={() => router.push("/")} className="text-2xl ml-2">
          ←
        </button>
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
              checked={friendsListSetting === "Private"}
              onChange={() => setFriendsListSetting("Private")}
              className="mr-2"
            />
            Private
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="friendsList"
              value="Only friends"
              checked={friendsListSetting === "Only friends"}
              onChange={() => setFriendsListSetting("Only friends")}
              className="mr-2"
            />
            Only friends
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="friendsList"
              value="Public"
              checked={friendsListSetting === "Public"}
              onChange={() => setFriendsListSetting("Public")}
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
              checked={profileSetting === "Private"}
              onChange={() => setProfileSetting("Private")}
              className="mr-2"
            />
            Private
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="profile"
              value="Only friends"
              checked={profileSetting === "Only friends"}
              onChange={() => setProfileSetting("Only friends")}
              className="mr-2"
            />
            Only friends
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="profile"
              value="Public"
              checked={profileSetting === "Public"}
              onChange={() => setProfileSetting("Public")}
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
};

export default Settings;
