import React, { Component } from 'react';
import {getURL, fetchData} from "./../utils/fetch";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null 
    }
  }

  componentDidMount(){
    const url = getURL('poems')
    const next = resjson => this.setState({ data: resjson })
    const success = status => console.log(status) 
    const failure = error => console.error(error)
    return fetchData(url, {}, next, success, failure)
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <main className="App-main">
          <p>Message</p>
          <hr/>
          <div className="App-guts">
            Hello, World!
          </div>
          <footer className="App-footer">
            <a href="#">10-20</a>
          </footer>
        </main>
        <aside className="App-side">ohi</aside>
      </div>
    );
  }
}

export default App;
