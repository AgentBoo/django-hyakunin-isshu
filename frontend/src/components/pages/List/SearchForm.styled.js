import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../../shared/Button.component";

export const StyledForm = styled.form`
	@media screen and (max-width: ${styles.breakpoint.sm}) {
		order: 2;
		width: 100%;
	}
`;

export const Label = styled.p`
	color: ${styles.light.tertiary};
`;

export const Group = styled.div`
	display: flex;
	align-items: center;
`

export const ClearButton = styled(Button)`
	background: ${styles.base.tertiary};
	border-radius: 50%;
	font-size: 0.8em;
	height: 3ch;
	margin: 0 2em;
	width: 3ch;

	&:hover{
		background: ${styles.light.tertiary};
	}
`;
