import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function QRCodeGenerator() {
	const [value, setValue] = useState<string>("");

	const userID = "123456";
	const userURL = `http://localhost:3000/profile/${userID}`;

	useEffect(() => {
		setValue(userURL);
	}, [userURL]);

	return (
		<div className='h-full w-full flex flex-col gap-5 items-center justify-center my-6'>
			{
				<div>
					<QRCode
						size={200}
						value={value}
					/>
				</div>
			}
		</div>
	);
}
