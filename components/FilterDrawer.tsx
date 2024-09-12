"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Filter from "@/components/Filter";
import { Filters } from "@/lib/utils/types";

const activities = [
  "tennis",
  "table tennis",
  "basketball",
  "volleyball",
  "yoga",
  "boule",
  "chess",
  "boxing",
  "badminton",
];

// type FilterDrawerProps = {
//   onFiltersApplied: (filters: Filters) => void;
// };

export function FilterDrawer() {
  const router = useRouter();
  const [activity, setActivity] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [excludeCompetitive, setExcludeCompetitive] = useState(true);
  const [isCompetitive, setIsCompetitive] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  function addFilters() {
    const filters: Filters = {};
    if (activity) {
      filters.activity = activity;
    }
    if (status) {
      filters.status = status;
    }
    if (excludeCompetitive) {
      filters.competitive = "both";
    }
    if (!excludeCompetitive && isCompetitive) {
      filters.competitive = "yes";
    }
    if (!excludeCompetitive && !isCompetitive) {
      filters.competitive = "no";
    }

    return filters;
  }

  const filteredFilters = addFilters();

  const queryString = new URLSearchParams(filteredFilters).toString();
  const url = `/?${queryString}`;

  function resetFilters() {
    setActivity(undefined);
    setStatus(undefined);
    setExcludeCompetitive(true);
    setIsCompetitive(false);

    router.push("/");
    window.location.href = "/";
  }

  // function handleApplyFilters() {
  //   router.push(url);
  //   window.location.href = fullUrl;
  // }

  function handleApplyFilters() {
    // Construct the full URL with the query parameters
    const fullUrl = `${window.location.origin}${url}`;

    // Force a page reload with the updated URL
    router.push(fullUrl);
    // window.location.href = fullUrl;
  }
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Filter />
        </DrawerTrigger>
        <DrawerContent className="z-[9998]">
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
            <DrawerDescription className="sr-only">
              This needs to be here
            </DrawerDescription>
          </DrawerHeader>
          <div className="m-3 flex flex-col gap-4 mb-10">
            <h2>Activity</h2>
            <Select onValueChange={setActivity} onOpenChange={setIsSelectOpen}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="all activities" />
              </SelectTrigger>
              <SelectContent className="bg-white p-3 z-[9999] pointer-events-auto">
                <SelectGroup>
                  {activities.map((activity) => (
                    <SelectItem
                      className="text-base"
                      key={activity}
                      value={activity}
                    >
                      {activity}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h2>Status</h2>
            <RadioGroup
              defaultValue="option-one"
              className={` flex justify-between ${
                isSelectOpen ? "hidden" : ""
              } `}
              onValueChange={setStatus}
            >
              <div className="flex flex-col w-1/2 pr-5 gap-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="free" className="text-base">
                    Free
                  </Label>
                  <RadioGroupItem value="free" id="free" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="joinNow" className="text-base">
                    Join now
                  </Label>
                  <RadioGroupItem value="joinNow" id="joinNow" />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-1/2 pr-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="joinTooday" className="text-base">
                    Join today
                  </Label>
                  <RadioGroupItem value="joinToday" id="joinToday" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="occupied" className="text-base">
                    Occupied
                  </Label>
                  <RadioGroupItem value="occupied" id="occupied" />
                </div>
              </div>
            </RadioGroup>
            <div className="flex justify-between items-center gap-1">
              <h2
                className={`${
                  excludeCompetitive ? "text-muted-foreground" : "text-primary"
                }`}
              >
                Competitive
              </h2>
              <Switch
                onCheckedChange={setIsCompetitive}
                disabled={excludeCompetitive}
              />

              <h2 className="pl-4">show both</h2>
              <Checkbox
                id="excludeCompetitive"
                checked={excludeCompetitive}
                onCheckedChange={(checked) => {
                  setExcludeCompetitive(checked as boolean);
                  if (!checked) {
                    setIsCompetitive(false);
                  }
                }}
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleApplyFilters}>Apply Filters</Button>
            </DrawerClose>
            <Button onClick={resetFilters}>Reset</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
