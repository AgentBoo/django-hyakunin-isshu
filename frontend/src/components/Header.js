import React from "react";
import { Navigation } from "./Navigation";

export const Header = ({ store }) => (
	<header className="flex">
		<h3>Ogura Hyakunin Isshu</h3>
		<Navigation store={store} />
	</header>
);
