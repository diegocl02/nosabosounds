import React, { Component } from 'react';
import './App.css';
import {Gameboard} from './components/gameboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Gameboard />
      </div>
    );
  }
}

export default App;
