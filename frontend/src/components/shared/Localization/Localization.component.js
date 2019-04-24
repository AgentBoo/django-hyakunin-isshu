import React from "react";
import { inject, observer } from "mobx-react";
import { languages } from "./../../../config/constants";
import { StyledSection, LocaleButton } from "./Localization.styled";

let Localization = ({ store }) => (
	<StyledSection>
		{languages.map(([abbr, language]) => (
			<LocaleButton
				key={abbr}
				active={store.locale === abbr}
				onClick={() => store.setLocale(abbr)}>
				{language}
			</LocaleButton>
		))}
	</StyledSection>
);

Localization = inject(provider => ({
	store: provider.store.listStore
}))(observer(Localization));

export { Localization };
