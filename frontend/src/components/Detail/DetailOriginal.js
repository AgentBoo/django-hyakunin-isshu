import React from "react";
import { useTrail, animated } from "react-spring";
import { Poem } from "./../toolbox";

// specifying duration will switch spring-based animation to duration-based
// https://www.react-spring.io/docs/hooks/api
const config = {
	mass: 1,
	tension: 100,
	friction: 25
};

let DetailOriginal = ({ poem }) => {
	const letters = poem.jap ? [...poem.jap.verses.join("")] : [];
	const trail = useTrail(letters.length, {
		config,
		from: { opacity: 0.1, color: "red" },
		to: { opacity: 1, color: "black" }
	});

	return (
		<section className="flex original">
			{trail.map(({ color, opacity }, index) => (
				<animated.div
					key={letters[index] + index}
					style={{ color, opacity }}>
					{letters[index]}
				</animated.div>
			))}
		</section>
	);
};

export { DetailOriginal };
