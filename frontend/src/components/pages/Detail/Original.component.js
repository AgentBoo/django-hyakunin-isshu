import React from "react";
import { useTrail, animated } from "react-spring";
import styles from "./../../../config/styles";
import { StyledContainer, LettersContainer } from "./Original.styled";

// specifying duration will switch spring-based animation to duration-based
// https://www.react-spring.io/docs/hooks/api
const config = {
	mass: 10,
	tension: 60,
	friction: 30
};

let Original = ({ poem }) => {
	const letters = [...poem.verses.join("")];
	const trail = useTrail(letters.length, {
		config,
		from: { opacity: 0.1, color: styles.base.accent },
		to: { opacity: 1, color: styles.base.primary }
	});

	return (
		<StyledContainer>
			<LettersContainer>
			{trail.map(({ color, opacity }, index) => (
				<animated.div key={letters[index] + index} style={{ color, opacity }}>
					{letters[index]}
				</animated.div>
			))}
			</LettersContainer>
			<h4>{poem.author}</h4>
			<h6>Source</h6>
		</StyledContainer>
	);
};

Original.defaultProps = {
	poem: {
		verses: []
	}
};

export { Original };
