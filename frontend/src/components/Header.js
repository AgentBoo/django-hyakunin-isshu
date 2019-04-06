import React, { Component } from "react";
import { Context } from "./Provider";
import { observer } from "mobx-react";
import { languages } from "./../config/constants";

class Header extends Component {
	static contextType = Context;
	render() {
		const { poems } = this.context;
		return (
			<header className="flex">
				<h3>Ogura Hyakunin Isshu</h3>
				<nav>
					{languages.map(([abbr, language]) => (
						<button
							key={abbr}
							type="button"
							className={
								poems.locale === abbr ? "button bold" : "button"
							}
							onClick={() => poems.setLocale(abbr)}>
							{language}
						</button>
					))}
				</nav>
			</header>
		);
	}
}

Header = observer(Header);

export { Header };
