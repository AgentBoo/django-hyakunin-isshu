import styled from "styled-components";
import styles from "./../../../config/styles";
import { Card } from "./../../shared";

export const StyledSection = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: calc(1em + 1vw);
	grid-column: main-start/main-end;
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
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: ${styles.breakpoint.sm}px){
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: ${styles.breakpoint.xs}px){
		grid-template-columns: 1fr;
	}
}
`;
