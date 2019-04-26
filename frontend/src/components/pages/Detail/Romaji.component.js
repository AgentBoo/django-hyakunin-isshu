import React from "react";
import { StyledSection } from "./Romaji.styled"

let Romaji = ({ poem }) => {
	return (
		<StyledSection>
			{poem.verses.map(verse => (
				<p key={verse}>{verse}</p>
			))}
		</StyledSection>
	);
};

Romaji.defaultProps = {
	poem: {
		verses: []
	}
};

export { Romaji };
