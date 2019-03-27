import React, { Component } from "react";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppStore } from "./AppStore";
import { List } from "./List";
import { Detail } from "./Detail";

export const store = new AppStore();

class App extends Component {
  componentDidMount() {
    store.fetch();
  }

  render() {
    return (
      <Router>
        <main>
          <button onClick={() => store.setLocale("eng")}>ENG</button>
          <button onClick={() => store.setLocale("jap")}>JAP</button>
          <button onClick={() => store.setLocale("rom")}>ROM</button>
          <section>
            <Route exact strict path="/" component={List} />
            <Route exact strict path="/:id" component={Detail} />
          </section>
        </main>
      </Router>
    );
  }
}

App = observer(App);

export default App;
