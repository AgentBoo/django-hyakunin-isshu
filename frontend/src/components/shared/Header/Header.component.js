import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader, SiteTitle, StyledPanel } from "./Header.styled";

const Header = ({ children }) => (
	<StyledHeader>
		<SiteTitle>
			<Link to="/">Ogura Hyakunin Isshu</Link>
		</SiteTitle>
		<StyledPanel>{children}</StyledPanel>
	</StyledHeader>
);

export { Header };
