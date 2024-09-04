import Navbar from "../components/Navbar";
import Search from "@/components/Search";
import MapAndDrawer from "@/components/MapAndDrawer";
import { getVenues } from "./api/data-acces/venues";
import { FilterDrawer } from "@/components/FilterDrawer";
import { filterVenues } from "@/lib/utils/filter-venues";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const venues = await getVenues();

  const parseBoolean = (val: string) => (val === "true" ? true : false);

  const filters = {
    activity: (searchParams.activity as string) ?? "",
    status: (searchParams.status as string) ?? "",
    competitive: searchParams.competitive as "yes" | "no" | "both",
  };

  console.log(filters);

  const filteredVenues = filterVenues(venues, filters);
  console.log("test in homepage 1");
  return (
    <div className="h-screen relative overflow-hidden">
      <MapAndDrawer venues={filteredVenues} />
      <Navbar />

      <Search />
      <FilterDrawer />
    </div>
  );
}
// Wann test the fi?
// Mussel gym yoga rummelsdorf free planned both
// Weisse Elster basketball alt-treptow private in past free competitive
// Beach club cossi tennis rummelsdorf-oben free non-competitive
//Boule bahn berlin boule Friedrichshain occupied both
