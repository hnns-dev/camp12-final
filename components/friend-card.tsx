import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, CalendarDays } from "lucide-react";
import { removeFriend } from "@/actions/friends"; // Import the server action

interface FriendCardProps {
  username: string;
  picture: string;
  location: string;
  friendsSince: string;
  userIdOne: string; // Add user ID props
  userIdTwo: string; // Add user ID props
}

export function FriendCard({
  username,
  picture,
  location,
  friendsSince,
  userIdOne,
  userIdTwo,
}: FriendCardProps) {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleRemoveFriend = async () => {
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await removeFriend(userIdOne, userIdTwo);
      if (response.success) {
        setResponseMessage("Friendship removed successfully");
        // Optionally, trigger a re-fetch of data or update the UI here
      } else {
        setResponseMessage("Failed to remove friendship");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setResponseMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative shadow-md border border-gray-200 rounded-md bg-background text-foreground">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex row">
            <Avatar className="h-10 w-10">
              <AvatarImage src={picture} alt={username} />
              <AvatarFallback>
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="pl-4">
              <p className="font-semibold">{username}</p>
              <p className="text-sm text-muted-foreground pt-1 pb-1">
                {location}
              </p>
              <div className="flex row">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p className="pl-1 text-xs text-muted-foreground">
                  Friends since {friendsSince}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="top-2 right-2 text-destructive hover:bg-transparent"
            onClick={handleRemoveFriend} // Attach the click handler
            disabled={loading} // Disable button while loading
          >
            <div className="absolute top-3 right-3 border p-2 rounded-md">
              <Trash2 className="h-4 w-4" />
            </div>
          </Button>
        </div>

        {/* Conditionally render the response message */}
        {responseMessage && (
          <p
            className={`mt-2 text-sm ${
              responseMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
