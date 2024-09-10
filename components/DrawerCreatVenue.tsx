import { FaCirclePlus } from "react-icons/fa6";
import {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";

import { Button, buttonVariants } from "./ui/button";

export function DrawerCreatVenue() {
	return (
		<Drawer>
			<DrawerTrigger>
				<FaCirclePlus className='size-8 fill-white' />{" "}
			</DrawerTrigger>
			<DrawerContent className='z-[9999] h-[calc(40vh-20vh)] w-full flex flex-col gap-3'>
				<DrawerHeader>
					<DrawerTitle className='sr-only'>Create venue</DrawerTitle>
					<DrawerDescription className='sr-only'>
						Create a new activity
					</DrawerDescription>
				</DrawerHeader>
				<div className='flex flex-row w-full items-center justify-between px-6 '>
					<Button className='h-11 w-32 items-center py-6'>Create Meet</Button>
					<Button className='h-11 w-32 items-center py-6'>Add Venue</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
