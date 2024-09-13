import { prisma } from "@/lib/db";
import MeetForm from "./meet";
import { protectPage } from "@/lib/auth";

export default async function CreateMeet({
  searchParams,
}: {
  searchParams: { queryString?: string };
}) {

  const user = await protectPage();

  if (searchParams.queryString) {
    // Location was give in query string
    const location = JSON.parse(searchParams.queryString);
    return (
      <div>
        {/* <TournamentPage /> */}
        <MeetForm userId={user.id} location={location} />
      </div>
    );
  } else {
    // Use Venue
    const venue = await prisma.venue.findUnique({
      where: {
        name: "Mussel Gym"
      }
    })
    return (
      <div>
        {/* <TournamentPage /> */}
        <MeetForm userId={user.id} venueId={venue?.id} />
      </div>
    );
  }
  

 
}
