import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader, SiteTitle, Panel } from "./Header.styled";

const Header = ({ children }) => (
	<StyledHeader>
		<SiteTitle>
			<Link to="/">Ogura Hyakunin Isshu</Link>
		</SiteTitle>
		<Panel>{children}</Panel>
	</StyledHeader>
);

export { Header };
