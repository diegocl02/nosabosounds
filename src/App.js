import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Scale} from './components/scale'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Scale isPlayable={true} reportRecordedSeq={(r) => console.log("recorded", r)} reportInitialSeq={(i) => console.log("initial on parent", i)}/>
      </div>
    );
  }
}

export default App;
