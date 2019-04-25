import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../../shared/Button.component";

export const StyledForm = styled.form`
	@media screen and (max-width: ${styles.breakpoint.sm}px) {
		order: 2;
	}
`;

export const Label = styled.p`
	color: ${styles.silver};

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		font-size: ${styles.typo.sm};
	}
`;

export const Group = styled.div`
	display: flex;
	align-items: center;
`;

export const ClearButton = styled(Button)`
	background: transparent;
	border-radius: 50%;
	color: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 1.7em;
	margin-left: 1em;
	width: 1.7em;
 
	&:hover {
		background: ${styles.silver};
		opacity: 0.8;
	}
`;
