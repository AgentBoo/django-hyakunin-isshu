import styled from "styled-components";
import styles from "./../../../config/styles";

const SplashContainer = styled.div`
	background: ${props => props.fullSize ? styles.porcelain : 'transparent'};
	display: ${props => props.fullSize ? 'flex' : 'none'};
	align-items: center;
	flex-flow: column nowrap;
	justify-content: center;
	height: 100vh;
	opacity: 0.9;
	position: fixed;
	width: 100vw;
`;

const SplashTitle = styled.h1`
	z-index: 2000;
`;

export { SplashContainer, SplashTitle };
