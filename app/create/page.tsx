import React from "react";
import CreateMeet from "./meet";

export default function UpdateMeet() {
  return (
    <div>
      {/* <TournamentPage /> */}
      <CreateMeet
        id={""}
        isPublic={false}
        creatorId={""}
        guests={0}
        venueId={""}
        activityTypeId={""}
      />
    </div>
  );
}
