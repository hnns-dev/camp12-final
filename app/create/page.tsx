import { prisma } from "@/lib/db";
import MeetForm from "./meet";
import { protectPage } from "@/lib/auth";

export default async function CreateMeet({
  searchParams,
}: {
  searchParams: { location?: string, venueId?: string };
}) {

  const user = await protectPage();

  if (searchParams.location) {
    // Location was given in url query
    const locationArray = JSON.parse(searchParams.location);
    return (
      <div>
        <MeetForm userId={user.id} location={locationArray} />
      </div>
    );
  } else if (searchParams.venueId) {
    // Called with venueId
   const venue = await prisma.venue.findUnique({
    where: {
      id: searchParams.venueId
      }
    });
   if (venue) {
    return (
      <div>
        <MeetForm userId={user.id} venueId={venue.id} venueName={venue.name} />
      </div>
    );
   }

    
  }
  

 
}
