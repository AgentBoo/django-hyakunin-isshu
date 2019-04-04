import React, { Component } from "react";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppStore } from "./AppStore";
import Header from "./Header"

import "./styles.css"

export const store = new AppStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false
    };
  }

  handleChange = event => store.setAlias(event.target.value);
  handlePaginate = p => store.setPage(p);

  render() {
    return (
      <Router>
        <Header store={store}/>
        <main>
          <input onChange={this.handleChange} value={store.alias} />

          {store.poems.map(p => (
            <p key={p.author}>{p.author}</p>
          ))}
          <br />
          {[1, 2, 3, 4].map((p, i) => (
            <button key={p} onClick={() => this.handlePaginate(i)}>
              Page{p}
            </button>
          ))}
          <br />
          <p>Search</p>
          {store.searched.map(f => (
            <p key={f.author}>{f.author}</p>
          ))}
        </main>
      </Router>
    );
  }
}

App = observer(App);

export default App;
