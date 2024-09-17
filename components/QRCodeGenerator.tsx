"use client";

import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useState } from "react";

type Props = {
	userId: String;
}

export default function QRCodeGenerator({userId}: Props) {
	const [value, setValue] = useState<string>("");

	const ipAddress = process.env.IP_ADDRESS;


	const connectURL = `http://${ipAddress}:3000/send-friend-request?userId=${userId}`;

	return (
		<div className='h-full w-full flex flex-col gap-5 items-center justify-center my-6'>
			{
				<div>
					<QRCode
						size={200}
						value={connectURL}
					/>
				</div>
			}
		</div>
	);
}
