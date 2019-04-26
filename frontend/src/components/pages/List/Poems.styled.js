import styled from "styled-components";
import styles from "./../../../config/styles";
import { Card } from "./../../shared";

export const StyledSection = styled.section`
	display: grid;
	align-items: stretch;
	justify-items: stretch;
	grid-auto-flow: row; 
	grid-template-columns: repeat(4, minmax(20ch, 1fr));
	grid-gap: calc(1em + 1vw);
	grid-column: main-start/4;
	position: relative;

	&:hover ${Card}{
		opacity: 0.8;
		transition: opacity 4s;
	}
	
	& ${Card}:hover{
		opacity: 1;
		transition: opacity 1s;
		z-index: 1000
	}
	
	@media screen and (max-width: ${styles.breakpoint.md}px){
		grid-column: main-start/main-end;
		grid-template-columns: repeat(3, minmax(20ch, 1fr));
	}

	@media screen and (max-width: ${styles.breakpoint.sm}px){
		grid-template-columns: repeat(2, minmax(20ch, 1fr));
	}

	@media screen and (max-width: ${styles.breakpoint.xs}px){
		grid-template-columns: 1fr;
	}
}
`;
 
export const Description = styled.section`
	display: block;
	color: ${styles.silver};

	& a{
		color: ${styles.silver};
		font-family: 'Roboto', sans-serif;
		font-size: ${styles.typo.sm};
		text-transform: uppercase;
	}
`;

