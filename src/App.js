import React, { Component } from "react";
import "./App.css";
import { Gameboard } from "./components/gameboard";
import * as Actions from "./redux/actions";
import { connect } from "react-redux";
import "./css/mystyles.css";

class App extends Component {



  render() {
    const buttonClass = 'button is-medium'
    return (
      <div>
        <nav className={"navbar is-primary"}>
          <div className={"container"}>
            <div className={"navbar-brand"}>
            <h1 className={"navbar-item"}>Nosabo-Sounds </h1>
          </div>
        </div>
        </nav>
        <div className={"section"}>
          <div className={"columns content"}>
            <div className={"column"} />
            <div className={"column has-text-centered"}>
              <h3>Wins: {this.props.wins}</h3>
              <h3>Loses: {this.props.loses}</h3>
            </div>
            <div className={"column buttons has-text-centered"}>
              <div
                className={buttonClass + (this.props.difficulty === "easy" ? " is-primary" : "")}
                onClick={() => this.props.changeDifficulty("easy")}
              >
                Easy
              </div>
              <div
                className={buttonClass + (this.props.difficulty === "medium" ? " is-warning" : "")}
                onClick={() => this.props.changeDifficulty("medium")}
              >
                Medium
              </div>
              <div
                className={buttonClass + (this.props.difficulty === "hard" ? " is-danger" : "")}
                onClick={() => this.props.changeDifficulty("hard")}
              >
                Hard
              </div>
            </div>
          </div>
        </div>

        <div className={"column has-text-centered"}>
          <Gameboard
            wins={this.props.wins}
            loses={this.props.loses}
            OnWin={this.props.UpdateWin}
            OnLose={this.props.UpdateLose}
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
    UpdateWin: () => {
      dispatch(Actions.incrementWins());
    },
    UpdateLose: () => {
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
