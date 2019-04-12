import React from "react";
import { inject, observer } from "mobx-react";
import { languages } from "./../../config/constants";

let Navigation = ({ poems }) => (
	<nav>
		{languages.map(([abbr, language]) => (
			<button
				key={abbr}
				type="button"
				className={poems.locale === abbr ? "button bold" : "button"}
				onClick={() => poems.setLocale(abbr)}>
				{language}
			</button>
		))}
	</nav>
);

Navigation = inject(provider => ({
	poems: provider.store.list
}))(observer(Navigation));

export { Navigation };
