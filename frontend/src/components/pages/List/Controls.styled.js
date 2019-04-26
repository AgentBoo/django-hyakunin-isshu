import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../../shared/Button.component";

export const StyledContainer = styled.div`
	display: flex;
	align-items: center;

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

export const Label = styled.span`
	color: ${styles.light.secondary};
	font-family: "Roboto", sans-serif;
	font-size: ${styles.typo.sm};
	font-weight: bold;
	margin: 0 1rem;
	text-transform: uppercase;
`;
