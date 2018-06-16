import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      p: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:8000/api/poems').then((response) => {
      console.log('Hi')
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({
        p: json
      })
    })
  }

  render() {
    let poems = this.state.p.map(poem => <p> {poem.author.eng } </p>) 

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          { poems }
        </div>
      </div>
    );
  }
}

export default App;
