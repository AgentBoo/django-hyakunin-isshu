import styled from "styled-components";
import styles from "./../../../config/styles";

export const StyledSection = styled.section`
	& > * {
		margin-bottom: 1em;
	}
`

export const Translator = styled.p`
	color: ${styles.silver};
	font-size: ${styles.typo.sm};
`;
