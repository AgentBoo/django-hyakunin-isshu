import React from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const config = {
	mass: 5,
	tension: 350,
	friction: 40
};

const transformation = scale => `perspective(600px) scale(${scale})`;

export const Poem = ({ poem, link }) => {
	const [{ opacity, scale }, set] = useSpring(() => ({
		config,
		from: { opacity: 0, scale: 1.0 },
		to: { opacity: 1, scale: 1.0 }
	}));

	return (
		<animated.div style={{ opacity }}>
			{poem && (
				<animated.div
					onMouseMove={() => set({ scale: 1.05 })}
					onMouseLeave={() => set({ scale: 1.0 })}
					style={{ transform: scale.interpolate(transformation) }}
					className="card">
					<p>{poem.numeral}</p>
					<p>{poem.author}</p>
					<div>{poem.verses}</div>
					{link && <Link to={link}>Detail</Link>}
				</animated.div>
			)}
		</animated.div>
	);
};
