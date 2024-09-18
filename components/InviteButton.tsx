// MAYBE DELTE THIS BUTTON LATER PLS

// // InviteButton.tsx
// "use client";

// import { inviteToMeet } from "@/actions/meet";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// interface InviteButtonProps {
//   userFriends: { email: string }[];
//   meetId: string;
// }

// export function InviteButton({ userFriends, meetId }: InviteButtonProps) {
//   const [loading, setLoading] = useState(false);

//   const handleInvite = async () => {
//     setLoading(true);
//     try {
//       const userMail = userFriends.map((friend) => friend.email);
//       await inviteToMeet(userMail, meetId);
//       console.log("Invite sent!");
//       alert("Invite Succesful");
//       window.location.href = `http://localhost:3000/meet/${meetId}`;
//     } catch (error) {
//       console.error("Failed to send invite", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Button className="w-64" onClick={handleInvite} disabled={loading}>
//         {loading ? "Inviting..." : "Invite Friends"}
//       </Button>
//     </div>
//   );
// }
