import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function QRCodeGenerator() {
	const [value, setValue] = useState<string>("");

	const userIdOne = "123456";
	const userIdTwo = "654321";
	const connectURL = `http://localhost:3000/api/new-friend?user-one=${userIdOne}&user-two=${userIdTwo}`;

	useEffect(() => {
		setValue(connectURL);
	}, [connectURL]);

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
