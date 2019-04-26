import styled from "styled-components";

export const StyledContainer = styled.div`
	padding: 1em 0;

	& > *{
		margin-bottom: 1em;
	}
`;

export const LettersContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	font-size: 2.6em;
	letter-spacing: 0.4em;
	line-height: 1.8;
	min-width: 8ch;
	max-width: 8ch;
`