import React from "react";
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { StyledContainer, CaretButton } from "./Controls.styled";

let Controls = ({ store, label, children }) => (
	<StyledContainer>
		<CaretButton onClick={() => store.setPage(store.page - 1)}>
			<Icon icon="long-arrow-alt-left" />
		</CaretButton>
		{label && <span>{label}</span>}
		{children && children(store.page, store.setPage)}
		<CaretButton onClick={() => store.setPage(store.page + 1)}>
			<Icon icon="long-arrow-alt-right" />
		</CaretButton>
	</StyledContainer>
);
 
Controls = inject(provider => ({
	store: provider.store.listStore
}))(observer(Controls));

export { Controls };
