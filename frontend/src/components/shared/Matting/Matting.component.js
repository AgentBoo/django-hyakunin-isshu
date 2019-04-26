import React from "react";
import { useSpring, animated } from "react-spring";
import { StyledContainer } from "./Matting.styled";

const config = {
	mass: 5,
	tension: 350,
	friction: 40
};

const transform = scale => `perspective(600px) scale(${scale})`;
const inverse = scale => `scale(${1 / scale})`;

const Matting = ({ children }) => {
	const [{ opacity, scale }, set] = useSpring(() => ({
		config,
		from: { opacity: 0.8, scale: 1.0 },
		to: { opacity: 1, scale: 1.0 }
	}));

	return (
		<animated.div style={{ opacity }}>
			<animated.div
				onMouseMove={() => set({ scale: 1.05 })}
				onMouseLeave={() => set({ scale: 1.0 })}
				style={{ transform: scale.interpolate(transform) }}>
				<StyledContainer>{children}</StyledContainer>
			</animated.div>
		</animated.div>
	);
};

export { Matting };
