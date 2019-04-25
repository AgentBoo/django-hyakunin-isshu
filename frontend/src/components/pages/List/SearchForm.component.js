import React from "react";
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { SearchInput } from "./SearchInput.component";
import { StyledForm, Label, Group, ClearButton } from "./SearchForm.styled";

let SearchForm = ({ store, searchPhrase, poems, page }) => {
  function setPhrase(value) {
    store.setSearchPhrase(value);
  }

  function resetPhrase() {
    store.setSearchPhrase("");
  }

  return (
    <StyledForm>
      {/* prettier-ignore */}
      <Label>
        <span>Search keyword</span>
      </Label>
      <Group>
        <SearchInput
          value={searchPhrase}
          onChange={setPhrase}
          placeholder={
            poems.length &&
            poems[page].eng.verses[0]
              .split(" ")
              .slice(0, 3)
              .join(" ")
          } />
        {searchPhrase && (
          <ClearButton onClick={resetPhrase}>
            <Icon icon="times"/>
          </ClearButton>
        )}
      </Group>
    </StyledForm>
  );
};

SearchForm = inject(provider => ({
  store: provider.store.listStore,
  page: provider.store.listStore.pageRange[0],
  searchPhrase: provider.store.listStore.searchPhrase,
  poems: provider.store.dataStore.collection
}))(observer(SearchForm));

export { SearchForm };
