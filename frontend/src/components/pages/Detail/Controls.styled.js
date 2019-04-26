import styled from "styled-components";
import styles from "./../../../config/styles";
import { Link } from "react-router-dom";

export const StyledSection = styled.section`
	display: flex;
	margin: 3em 0;
`;

export const StyledLink = styled(Link)`
	color: ${styles.base.accent};
`;

export const Label = styled.span`
	font-size: ${styles.typo.sm};
	font-weight: bold;
	margin: 1em;
	text-transform: uppercase;
}
`;

/*
export const PoemContainer = styled.div`
	& a::after{
		content: 'yellow';
		opacity: 0;
		margin-left: 12em;
		transition: all ease-in-out 0.6s
	}

	&:hover a::after{
		opacity: 1;
		margin-left: 14em;
		transform: translateX(20px);
	}
`

*/
