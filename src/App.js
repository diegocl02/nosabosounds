import React, { Component } from 'react';
import './App.css';
import { Gameboard } from './components/gameboard';
import * as Actions from './redux/actions'
import { connect } from 'react-redux'
import { config } from './config'

class App extends Component {
  styleSwitch = {
    width: "30%",
    border: "thin solid gray",
    borderWidth: "thin",
    padding: "0.5em",
    height: "1em",
    margin: "1em",
    cursor: "pointer"
  }

  styleSelected = {
    borderColor: config.theme.colors.border, 
    borderWidth: "2px"
  }

  render() {
    return (
      <div className="App">
        <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{width: "30%"}}></div>
          <div style={{width: "40%"}}><p>Wins: {this.props.wins}</p>
          <p>Loses: {this.props.loses}</p></div>
          <div style={{display: "flex", flexDirection: "row", width: "30%"}}>
          <div style={{...this.styleSwitch, ...(this.props.difficulty === 'easy' ? this.styleSelected: null)}}
            onClick={() => this.props.changeDifficulty('easy')}
          > Easy </div>
          <div style={{...this.styleSwitch, ...(this.props.difficulty === 'medium' ? this.styleSelected: null)}}
            onClick={() => this.props.changeDifficulty('medium')}
          > Medium </div>
            <div style={{...this.styleSwitch, ...(this.props.difficulty === 'hard' ? this.styleSelected: null)}}
              onClick={() => this.props.changeDifficulty('hard')}
            > Hard </div></div>
      </div>
        <Gameboard
          wins= {this.props.wins}
          loses= {this.props.loses}
          OnWin= {this.props.UpdateWin}
          OnLose= {this.props.UpdateLose}
          difficulty= {this.props.difficulty}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wins: state.wins,
    loses: state.loses,
    difficulty: state.difficulty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UpdateWin: () => {
      dispatch(Actions.incrementWins())
    },
    UpdateLose: () => {
      dispatch(Actions.incrementLoses())
    },
    changeDifficulty: (diff) => {
      dispatch(Actions.changeDifficulty(diff))
    }
  }
}

const PrepareApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default PrepareApp;
