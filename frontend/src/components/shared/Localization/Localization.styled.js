import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../Button.component";

export const StyledSection = styled.section`
	display: flex;
	align-items: baseline;
	flex-flow: row nowrap;
	justify-content: flex-end;

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		justify-content: flex-start;
	}
`;

export const LocaleButton = styled(Button)`
	color: ${props => (props.active ? styles.base.accent : styles.base.secondary)};
	font-weight: bold;
	margin-left: calc(1em + 1vw);

	&:hover {
		color: ${styles.light.primary};
	}

	@media screen and (max-width: ${styles.breakpoint.xs}px) {
		margin-left: 0;
		margin-right: calc(1em + 1vw);
	}
`;
