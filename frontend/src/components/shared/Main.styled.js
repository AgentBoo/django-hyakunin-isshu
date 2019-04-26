import styled from "styled-components";

export const Main = styled.main`
	display: grid;
	grid-template-columns: [main-start] repeat(5, 1fr) [main-end];
	grid-gap: calc(1em + 1vw);
	align-items: stretch;
	justify-items: stretch;
`;