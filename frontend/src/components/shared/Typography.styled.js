import styled from "styled-components";
import styles from "./../../config/styles";

export const Pigment = styled.span`
	color: ${styles.base.accent};
`;

export const HelpText = styled.p`
	color: ${styles.silver};
	font-family: 'Roboto';
	font-size: ${styles.typo.sm};
	text-align: ${props => props.align ? props.align : 'left'};
`