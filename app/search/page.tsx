import Search from "@/components/Search";
import { prisma } from "@/lib/db";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  console.log("Search Params", searchParams.q);

  const searchQuery = searchParams.q || "";

  const venues = await prisma.venue.findMany({
    where: {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { location: { location: searchQuery, mode: "insensitive" } },
      ],
    },
  });

  return <div>SEARCH</div>;
};

export default SearchPage;
