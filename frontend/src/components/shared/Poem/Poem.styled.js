import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card } from "./../Card.styled";

export const Matting = styled(Card)`

	padding: 1em;
`;

export const Description = styled.section`
	display: block;
	color: grey;
`;

export const PoemContainer = styled.div`
	margin-bottom: 1rem;
`;

export const DetailLink = styled(Link)`
	color: grey;
	font-size: 0.8em;
	font-family: 'Roboto', sans-serif;
	
	&:hover {
		border-bottom: solid 1px red;
	}
`;
