import React, { Component } from "react";
import { AppStore } from "./AppStore";

const store = new AppStore();

class App extends Component {
  render() {
    return (
      <div>
        <main>
          <h4>ohi</h4>
          <button onClick={() => store.localize("eng")}>ENG</button>
          <button onClick={() => store.localize("jap")}>JAP</button>
          <button onClick={() => store.localize("rom")}>ROM</button>
        </main>
        <aside>ohi</aside>
      </div>
    );
  }
}

export default App;
