import React, { Fragment, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Matting, Description } from "./Translation.styled"
import { toJS } from "mobx";
const config = {
	mass: 5,
	tension: 350,
	friction: 40
};

const transform = scale => `perspective(600px) scale(${scale})`;
const inverse = scale => `scale(${1 / scale})`;

const Translation = ({ translation, link }) => {
	const [show, setShow] = useState(false);
	const [{ opacity, scale }, set] = useSpring(() => ({
		config,
		from: { opacity: 0.8, scale: 1.0 },
		to: { opacity: 1, scale: 1.0 }
	}));

	return (
		<animated.div style={{ opacity }}>
			{translation && (
				<animated.div
					onMouseMove={() => set({ scale: 1.05 })}
					onMouseLeave={() => set({ scale: 1.0 })}
					style={{ transform: scale.interpolate(transform) }}>
					{
						translation.verses.map(verse => <p>{verse}</p>)
					}
				</animated.div>
			)}
			{translation && (
				<Description>
					<p>{translation.author}</p>
					{link && <Link to={link}>Detail</Link>}
				</Description>
			)}
		</animated.div>
	);
};

export { Translation };
