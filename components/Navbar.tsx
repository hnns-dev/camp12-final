"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTableTennis } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { DrawerUpComingSessions } from "./DrawerUpComingSessions";

export default function Navbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<nav className='flex rounded-3xl absolute z-[999] bottom-4 right-4 left-4 p-5 bg-zinc-800/80 justify-between items-center'>
			<button
				onClick={toggleDrawer}
				className='nav-button'
			>
				{/* <div className="flex flex-col items-center justify-center">
          <FaTableTennis className="size-8 fill-white" />
        </div> */}
				<DrawerUpComingSessions
					meets={[]}
					tournaments={[]}
					userId={""}
				/>
				{/* Sessions Content*/}
			</button>
			<FaLocationCrosshairs className='size-8 fill-white' />
			<Link
				href='/profile'
				className='nav-link'
			>
				<div className='nav-button'>
					<div className='flex flex-col items-center justify-center'>
						<FaUser className='size-8 fill-white' />
					</div>
					{/* Profile Content*/}
				</div>
			</Link>
		</nav>
	);
}
