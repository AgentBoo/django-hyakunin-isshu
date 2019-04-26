import styled from "styled-components";
import styles from "./../../../config/styles";

export const StyledSection = styled.section`
	display: flex;
	align-items: center;
	flex-flow: row wrap;
	justify-content: space-between;
	grid-column: main-start/main-end;
	width: 100%;

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		& > * {
			width: 100%;	
		}
	}
`
 