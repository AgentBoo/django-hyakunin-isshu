import React from "react";
import { StyledSection, StyledAside } from "./Complement.styled"

let Complement = ({ poem }) => {
	return (
		<StyledSection>
			<h2>{poem.rom.numeral}</h2>
			<h1>{poem.rom.author}</h1>
			<h5>{poem.eng.author}</h5>
			<StyledAside>
				<h5>Media</h5>
				<h6>Anime</h6>
				<p>N/A</p>
				<h6>Manga</h6>
				<p>N/A</p>
				<h5>Karuta</h5>
				<h6>Syllabicity</h6>
				<p>N/A</p>
				<h6>Syllable group</h6>
				<p>N/A</p>
			</StyledAside>
		</StyledSection>
	);
};

export { Complement };
