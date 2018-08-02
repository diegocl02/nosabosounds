import React, { Component } from 'react';
import './App.css';
import { Gameboard } from './components/gameboard';
import * as Actions from './redux/actions'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Wins: {this.props.wins}</p>
        <p>Loses: {this.props.loses}</p>
        <Gameboard
          wins= {this.props.wins}
          loses= {this.props.loses}
          OnWin= {this.props.UpdateWin}
          OnLose= {this.props.UpdateLose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wins: state.wins,
    loses: state.loses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UpdateWin: () => {
      dispatch(Actions.incrementWins())
    },
    UpdateLose: () => {
      dispatch(Actions.incrementLoses())
    }
  }
}

const PrepareApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default PrepareApp;
