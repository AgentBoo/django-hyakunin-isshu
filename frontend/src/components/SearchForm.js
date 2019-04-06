import React, { Component } from "react";
import { Context } from "./Provider";
import { observer } from "mobx-react";

class SearchForm extends Component {
  static contextType = Context;

  handleChange = event => {
    this.context.poems.setSearchPhrase(event.target.value);
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.context.poems.setSearchPhrase("");
    }
  };

  render() {
    const { searchPhrase } = this.context.poems
    return (
      <form>
        <input
          type="text"
          value={searchPhrase}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}

SearchForm = observer(SearchForm);

export { SearchForm };
