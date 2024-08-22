import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function QRCodeGenerator() {
	const [value, setValue] = useState<string>("");
	const [displayCode, setDisplayCode] = useState<boolean>(false);

	const userID = "123456";
	const userURL = `http://localhost:3000/profile/${userID}`;

	useEffect(() => {
		setValue(userURL);
	}, [userURL]);

	function generateQRCodeHandler() {
		if (!value) {
			return;
		} else {
			setDisplayCode(true);
		}
	}

	return (
		<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
			<h1 className='text-xl font-semibold'>Add to your friends list...</h1>

			<button
				className='bg-zinc-800 px-4 py-2 text-slate-50 rounded-md w-1/2 ls:w-1/3'
				onClick={generateQRCodeHandler}
			>
				Generate QR-Code
			</button>
			{displayCode && (
				<div>
					<QRCode
						size={200}
						value={value}
					/>
				</div>
			)}
		</div>
	);
}
