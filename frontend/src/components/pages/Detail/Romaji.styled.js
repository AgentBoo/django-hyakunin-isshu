import styled from "styled-components";
import styles from "./../../../config/styles";

export const StyledSection = styled.section`
	color: ${styles.base.secondary};
	font-size: ${styles.typo.sm};
	padding: 3em 0;

	@media screen and (max-width: ${styles.breakpoint.md}px){
		border-top: solid 1px ${styles.silver};
	}
`;
