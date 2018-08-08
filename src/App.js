// @flow

import React, { Component } from "react";
import "./App.css";
import { Gameboard } from "./components/gameboard";
import * as Actions from "./redux/actions";
import { connect } from "react-redux";
import { SettingsPanel } from "./components/settings-panel";
import {NavBar} from './components/nav-bar';
import "./css/mystyles.css";

type Props = {
  wins: number,
  loses: number,
  difficulty: string,

  changeDifficulty: (diff: string) => void;
  updateWin: () => void;
  updateLose: () => void
}

class App extends Component<Props> {
  render() {
    const buttonClass = "button is-medium";
    return (
      <div>
        <NavBar brandName={'Nosabo-Sounds'}/>
        <SettingsPanel
          wins={this.props.wins}
          loses={this.props.loses}
          difficulty={this.props.difficulty}
          onChangedDifficulty={(diff)=> this.props.changeDifficulty(diff)}
        />
        <div className={"column has-text-centered"}>
          <Gameboard
            wins={this.props.wins}
            loses={this.props.loses}
            OnWin={this.props.updateWin}
            OnLose={this.props.updateLose}
            difficulty={this.props.difficulty}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wins: state.wins,
    loses: state.loses,
    difficulty: state.difficulty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWin: () => {
      dispatch(Actions.incrementWins());
    },
    updateLose: () => {
      dispatch(Actions.incrementLoses());
    },
    changeDifficulty: diff => {
      dispatch(Actions.changeDifficulty(diff));
    }
  };
};

const PrepareApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default PrepareApp;
