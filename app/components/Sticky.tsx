"use client";

import React, { FC } from 'react'
import { RichText } from 'readcv';

interface StickyProps {
	status: {
		text: string;
		emoji: string;
		timestamp: number;
	};
}

const Sticky: FC<StickyProps> = (props) => {
	let date = new Date(props.status.timestamp);
	let day = date.toLocaleString("en-En", {
		weekday: "short",
	});
	let month = date.toLocaleString("en-En", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	return (
		<div className="sticky">
			<RichText text={props.status.text} />
			<p>
				&ndash; {day} {month}
			</p>
		</div>
	);
};
export default Sticky