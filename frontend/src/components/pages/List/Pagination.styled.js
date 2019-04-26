import styled from "styled-components";
import styles from "./../../../config/styles";
import { Button } from "./../../shared/Button.component";

export const StyledSection = styled.section`
	grid-column: main-start/3;
	width: 100%;

	@media screen and (max-width: ${styles.breakpoint.sm}px){
		grid-column: main-start/main-end;
	}
`;

export const Pages = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 100%;
`;

export const PageButton = styled(Button)`
	border-bottom: solid 2px ${props => (props.active ? styles.base.primary : "transparent")};
	color: ${styles.base.primary};
	font-size: inherit;
	font-weight: bold;
	padding: 2px;

	&:hover {
		border-color: ${props => (props.active ? styles.base.primary : styles.base.accent)};
		color: ${styles.base.accent};
	}
`;
 