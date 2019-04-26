import styled from "styled-components";

export const Main = styled.main`
	display: grid;
	grid-template-columns: [main-start] repeat(5, 1fr) [main-end];
	grid-gap: calc(1em + 1vw);
	align-items: start;
	justify-items: start;
`

export const MainCol = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: 1fr;
`;