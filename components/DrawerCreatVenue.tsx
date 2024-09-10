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

export function DrawerCreatVenue() {
	return (
		<Drawer>
			<DrawerTrigger>
				<FaCirclePlus className='size-8 fill-white' />{" "}
			</DrawerTrigger>
			<DrawerContent className='z-[9999] h-[calc(40vh-20vh)] flex flex-col pb-0'></DrawerContent>
		</Drawer>
	);
}
