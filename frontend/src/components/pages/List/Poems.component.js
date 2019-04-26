import React from "react";
import { inject, observer } from "mobx-react";
import { StyledSection } from "./Poems.styled";
import { Poem } from "./../../shared";

let Poems = ({ poems }) => (
	<StyledSection>
		{poems.map((p, idx) => (
			<Poem key={p.author} poem={p} link={`/${p.numeral}/`} />
		))}
	</StyledSection>
);

Poems = inject(provider => ({
	poems: provider.store.listStore.list
}))(observer(Poems));

export { Poems };
