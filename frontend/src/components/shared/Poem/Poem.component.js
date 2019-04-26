import React, { Fragment, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Matting, Description, PoemContainer, DetailLink } from "./Poem.styled"

const config = {
	mass: 5,
	tension: 350,
	friction: 40
};

const transform = scale => `perspective(600px) scale(${scale})`;
const inverse = scale => `scale(${1 / scale})`;

const Poem = ({ poem, link }) => {
	const [show, setShow] = useState(false);
	const [{ opacity, scale }, set] = useSpring(() => ({
		config,
		from: { opacity: 0.8, scale: 1.0 },
		to: { opacity: 1, scale: 1.0 }
	}));

	return (
		<PoemContainer>
		<animated.div style={{ opacity }}>
			{poem && (
				<animated.div
					onMouseMove={() => set({ scale: 1.05 })}
					onMouseLeave={() => set({ scale: 1.0 })}
					style={{ transform: scale.interpolate(transform) }}>
					<Matting>{poem.verses.map(verse => <p>{verse}</p>)}</Matting>
				</animated.div>
			)}
			{poem && (
				<Description>
					<p>{poem.author}</p>
					{link && <DetailLink to={link}>Detail</DetailLink>}
				</Description>
			)}
		</animated.div>
		</PoemContainer>
	);
};

export { Poem };
