import styled from "styled-components";
import styles from "./../../../config/styles";

export const StyledHeader = styled.header`
	display: block;
	width: 100%;
`;

export const SiteTitle = styled.h3`
	color: ${styles.primary};
	display: inline-block;
	font-size: 0.8em;
	max-width: 50px;
	text-transform: lowercase;
	
	& a{
		color: inherit;
	}

	& a:hover{
		color: ${styles.secondary};
		transition: color ease-in-out 0.5s;
	}
`;

export const Panel = styled.section`
	display: flex;
	align-items: baseline;
	flex-flow: row wrap;
	justify-content: space-between;
	width: 100%;

	@media screen and (max-width: 769px){
    justify-content: flex-end;
  }
`
 