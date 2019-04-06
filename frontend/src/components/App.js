import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer } from "mobx-react";
import { AppStore } from "./../store/AppStore";
import { Detail } from "./Detail";
import { List } from "./List"

import "./styles.css";

export const store = new AppStore();

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={List} />
        <Route exact path="/:index/" component={Detail} />
      </Router>
    );
  }
}

App = observer(App);

export default App;
