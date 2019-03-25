import React, { Component } from "react";
import { getURL, fetchData } from "./../utils/fetch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const url = getURL("poems");
    const next = resjson => this.setState({ data: resjson });
    const success = status => console.log(status);
    const failure = error => console.error(error);
    return fetchData(url, {}, next, success, failure);
  }

  render() {
    return (
      <div>
        <main>
          <ol>
            {this.state.data.map(item => (
              <li key={item.id}>{item.eng.author}</li>
            ))}
          </ol>
        </main>
      </div>
    );
  }
}

export default App;
