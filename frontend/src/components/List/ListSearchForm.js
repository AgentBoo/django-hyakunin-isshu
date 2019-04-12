import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class ListSearchForm extends Component {
  resetPhrase = () => this.props.poems.setSearchPhrase("");
  setPhrase = ({ target }) => this.props.poems.setSearchPhrase(target.value);

  render() {
    const { searchPhrase } = this.props.poems;
    const numberOfPoems = this.props.poems.list.length;

    return (
      <form>
        <input type="text" value={searchPhrase} onChange={this.setPhrase} />
        {searchPhrase && (
          <div>
            <button type="button" onClick={this.resetPhrase}>
              Clear
            </button>
            <p>{this.props.poems.list.length} results </p>
            {!numberOfPoems && (
              <p> Have you tried searching in the right language category? </p>
            )}
          </div>
        )}
      </form>
    );
  }
}

ListSearchForm = inject(provider => ({
  poems: provider.store.list
}))(observer(ListSearchForm));

export { ListSearchForm };
