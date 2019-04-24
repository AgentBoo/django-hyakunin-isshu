import styled from "styled-components";
import { Button } from "./../Button.component";

export const StyledSection = styled.section`
	display: flex;
	align-items: baseline;
	flex-flow: row nowrap;
	justify-content: flex-end;
`;

export const LocaleButton = styled(Button)`
	font-weight: ${props => (props.active ? "bold" : "normal")}
	margin-left: calc(1em + 1vw);
	
	&:hover{
		color: grey;
	}
`;
 
