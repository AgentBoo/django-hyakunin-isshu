import React from "react";
import Navigation from "./Navigation";

const Header = ({ store }) => (
	<header className="flex">
		<h3>Ogura Hyakunin Isshu</h3>
		<Navigation store={store} />
	</header>
);

export default Header;
