import { createGlobalStyle } from "styled-components";

export const Theme = createGlobalStyle`
	body{
		background: ${props => (props.night ? "black" : "white")}
		color: ${props => (props.night ? "white" : "black")};
	}
`;
