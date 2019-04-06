import React from "react";
import { observer } from "mobx-react";
import { languages } from "./../config/constants";

export const Navigation = observer(({ store }) => (
	<section>
		{languages.map(([abbr, language]) => (
			<button
				key={abbr}
				type="button"
				className={
					store.poems.locale === abbr ? "button bold" : "button"
				}
				onClick={() => store.poems.setLocale(abbr)}>
				{language}
			</button>
		))}
	</section>
));
