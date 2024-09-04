"use client";

import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import { DrawerHompage } from "@/components/DrawerHomepage";
import ShowMeets from "@/components/ShowMeet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Test from "@/components/Test";

export default function Home() {
	const Map = useMemo(
		() =>
			dynamic(() => import("@/components/Map"), {
				loading: () => <p className='p-40 text-center'>A map is loading</p>,
				ssr: false,
			}),
		[]
	);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawer = () => {
		setIsDrawerOpen(true);
	};

	return <ShowMeets />;
}
