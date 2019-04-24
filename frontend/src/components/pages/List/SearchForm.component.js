import React from "react";
import { inject, observer } from "mobx-react";
import { SearchInput } from "./SearchInput.component";
import { StyledForm, Label, Group, ClearButton } from "./SearchForm.styled";

let SearchForm = ({ store, searchPhrase, poems }) => {
  function setPhrase({ target }) {
    store.setSearchPhrase(target.value);
  }

  function resetPhrase() {
    store.setSearchPhrase("");
  }

  return (
    <StyledForm>
      {/* prettier-ignore */}
      <Label>
        Search keyword
      </Label>
      <Group>
        <SearchInput
          value={searchPhrase}
          onChange={setPhrase}
          placeholder={poems.length && poems[0].verses[0]}/>
        {searchPhrase && <ClearButton onClick={resetPhrase}>x</ClearButton>}
      </Group>
    </StyledForm>
  );
};

SearchForm = inject(provider => ({
  store: provider.store.listStore,
  poems: provider.store.listStore.list,
  searchPhrase: provider.store.listStore.searchPhrase
}))(observer(SearchForm));

export { SearchForm };
