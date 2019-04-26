import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../../shared/Button.component";

export const StyledContainer = styled.div`
	display: flex;

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		justify-content: space-between;
	}
`;

export const CaretButton = styled(Button)`
	color: ${styles.base.secondary};
	font-size: 1.4em;
	padding: 4px;

	&:hover {
		color: ${styles.base.accent};
	}
`;
