import React from 'react';
import {Scale} from './scale';
import '../styles.css';

export class Gameboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isWinner: 0,
      step: "Begin",
      fixed_seq: [],
      record_seq: [],
    }
  }
  element = []

  setSteps() {
    switch (this.state.step) {
      case "Begin":
        this.setState({step: "Listen"})
        this.element =
        <Scale
          noteNumber = {5}
        />
        break;
      case "Listen":
        this.setState({step: "Scale Play"})
        break;
      case "Scale Play":
        this.setState({step: "Scale Record"})
        break;
      case "Scale Record":
        let seq_equal = this.state.fixed_seq.join() === this.state.record_seq.join()
        this.setState({step: seq_equal ? "You Win" : "You Lose",
                      isWinner: seq_equal ? 1 : 0,
                      })
        break;
      default:
        this.setState({step: "Begin"})
      }
  }

  render() {
    console.log(this.state.isWinner)
    return (
      <div className="gameboard">
        <div className="announcer" onClick={() => this.setSteps()}>
          {this.state.step}
        </div>
          {this.element}
      </div>
    );
  }
}
