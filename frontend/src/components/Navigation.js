import React from "react";
import { observer } from "mobx-react";
import { languages } from "./../config/constants";

const Navigation = observer(({ store }) => (
	<section>
		{languages.map(([abbr, language]) => (
			<button
				key={abbr}
				type="button"
				className={store.locale === abbr ? "button bold" : "button"}
				onClick={() => store.setLocale(abbr)}>
				{language}
			</button>
		))}
	</section>
));

export default Navigation;
