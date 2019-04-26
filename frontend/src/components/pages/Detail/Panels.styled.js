import styled from "styled-components";
import styles from "./../../../config/styles";

const Column = styled.section`
	display: grid;
	align-items: start;
	grid-auto-flow: row;
	grid-auto-rows: max-content;
	grid-template-columns: 1fr;
	height: 100%;
`;

export const StartColumn = styled(Column)`
	grid-column: 1/2;
	min-width: 18em;
`;

export const CoreColumn = styled(Column)`
	grid-column: 2/3;

	@media screen and (max-width: ${styles.breakpoint.md}px) {
		grid-column: 2 / main-end;
	}

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		grid-column: 1 / main-end;
	}
`;

export const EndColumn = styled(Column)`
	grid-column: 3 / main-end;

	@media screen and (max-width: ${styles.breakpoint.md}px) {
		grid-column: 2 / main-end;
	}

	@media screen and (max-width: ${styles.breakpoint.sm}px) {
		grid-column: 1 / main-end;
	}
`;
