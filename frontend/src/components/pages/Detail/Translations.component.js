import React from "react";
import { useSpring, animated } from "react-spring";
import { StyledSection, Translator } from "./Translations.styled";

const Translations = ({ translations }) => {
	const style = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

	return (
		<StyledSection>
			<h6>Translations</h6>
			<animated.div style={style}>
				{translations.map(translation => (
					<div key={translation.translator}>
						{translation.verses.map(verse => (
							<p key={verse}>{verse}</p>
						))}
						<Translator>{translation.translator}</Translator>
					</div>
				))}
			</animated.div>
		</StyledSection>
	);
};

Translations.defaultProps = {
	translations: []
};

export { Translations };
