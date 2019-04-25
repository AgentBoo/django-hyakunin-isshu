import styled from "styled-components";
import styles from "./../../../config/styles";

export const StyledHeader = styled.header`
	width: 100%;
`;

export const SiteTitle = styled.h3`
	color: ${styles.base.accent};
	display: inline-block;
	font-size: ${styles.typo.sm};
	max-width: 50px;
	text-transform: lowercase;

	& a {
		color: inherit;

		&:hover {
			color: ${styles.light.accent};
		}
	}
`;

export const StyledPanel = styled.section`
	display: flex;
	align-items: baseline;
	flex-flow: row wrap;
	justify-content: space-between;

	@media screen and (max-width: ${styles.breakpoint.sm}px) {
		& > * {
			width: 100%;
		}
	}
`;
