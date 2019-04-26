import styled from "styled-components";
import { Card } from "./../Card.styled"

const Matting = styled(Card)`
	background: grey;
	padding: 1em;
`

const Description = styled.section`
	display: block;
	color: grey;
	
	& a::after{
		content: 'yellow';
		opacity: 0;
		margin-left: 12em;
		transition: all ease-in-out 0.6s
	}

	& a:hover::after{
		opacity: 1;
		margin-left: 14em;
		transform: translateX(20px);
	}
`

export { Matting, Description }