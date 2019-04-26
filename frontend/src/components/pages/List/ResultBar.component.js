import React from "react";
import { inject, observer } from "mobx-react";
import { Controls } from "./Controls.component";
import { StyledSection } from "./ResultBar.styled";
import { HelpText, Pigment } from "./../../shared";

let ResultBar = ({ searchPhrase, pageRange, total }) => (
	<StyledSection>
		<div>
			{!searchPhrase ? (
				<HelpText>
					Showing	<Pigment>{pageRange[0] + 1} - {pageRange[1]}</Pigment>{" "}
					out of 100.
				</HelpText>
			) : (
				<HelpText>
					Showing <Pigment>{total}</Pigment> results out of 100.
				</HelpText>
			)}
			{!total && (
				<HelpText>
					Have you tried searching in the right language category?
				</HelpText>
			)}
		</div>
		<Controls />
	</StyledSection>
);

ResultBar = inject(provider => ({
	searchPhrase: provider.store.listStore.searchPhrase,
	pageRange: provider.store.listStore.pageRange,
	total: provider.store.listStore.list.length
}))(observer(ResultBar));

export { ResultBar };
