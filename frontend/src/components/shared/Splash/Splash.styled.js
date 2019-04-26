import styled from "styled-components";
import styles from "./../../../config/styles";

export const SplashContainer = styled.div`
	background: ${props => props.fullSize ? styles.porcelain : 'transparent'};
	display: ${props => props.fullSize ? 'flex' : 'none'};
	align-items: center;
	flex-flow: column nowrap;
	justify-content: center;
	opacity: 0.9;
	padding: 10vw;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

export const SplashTitle = styled.h1`
	font-family: 'Roboto', sans-serif;
	margin: 2.4em 0;
	z-index: 2000;
`;

 