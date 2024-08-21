import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function QRCodeGenerator() {
	const [value, setValue] = useState<string>("");
	const [displayCode, setDisplayCode] = useState<boolean>(false);

	const generateQRCodeHandler = () => {
		if (!value) {
			return;
		} else {
			setDisplayCode(true);
		}
	};

	return (
		<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
			<h1 className='text-3xl xl:text-xl font-semibold'>
				QR-Code Generator 🔥
			</h1>
			<input
				className='border-solid border-2 rounded border-zinc-500 w-1/2 ls:w-1/3 max-h-9 min-h-5  text-lg'
				type='text'
				placeholder='Type a URL...'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
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
