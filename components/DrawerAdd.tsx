import { FaCirclePlus, FaCrosshairs } from "react-icons/fa6";
import {
  Drawer,
  DrawerOverlay,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

import { Button } from "./ui/button";
import Link from "next/link";
import { GiCrosshair } from "react-icons/gi";
import { useState } from "react";

export function DrawerAdd() {
  const [isDrawerAddOpen, setIsDrawerAddOpen] = useState(false);

  return (
    <div>
      <GiCrosshair
        className={`size-20 z-[9999] absolute mt-[-50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isDrawerAddOpen ? "" : "hidden"
        }`}
      />
      <div>
        <Drawer>
          <DrawerTrigger onClick={() => setIsDrawerAddOpen(true)}>
            <FaCirclePlus className="size-8 fill-white" />{" "}
          </DrawerTrigger>
          <DrawerContent
            transparentBg
            className="z-[9999] h-[calc(40vh-20vh)] w-full flex flex-col gap-3"
          >
            <DrawerHeader>
              <DrawerTitle className="sr-only">Create venue</DrawerTitle>
              <DrawerDescription className="sr-only">
                Create a new Venue or Meet
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-row w-full items-center justify-between px-6 ">
              <Link href="/create">
                <Button className="h-11 w-32 items-center py-6">
                  Create Meet
                </Button>
              </Link>
              <Link href="/create-venue">
                <Button className="h-11 w-32 items-center py-6">
                  Add Venue
                </Button>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
