import React from 'react';
import { Scale } from './scale';
import '../styles.css';

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWinner: 0,
      step: "Begin",
      seq: this.generateRandomSeq(5),
      record_seq: [],
    }
  }
  element = []

  checkWinner(seq){
    let seq_equal = this.state.seq.join() === seq.join()
    this.setState({
          step: seq_equal ? "You Win, Try again?" : "You Lose, Try again?",
          isWinner: seq_equal ? 1 : 0,
          record_seq: seq
    })
  }

  generateRandomSeq(numberOfNotes) {
      let newSeq = []
      for (let i = 0; i < numberOfNotes; i++) {
          let ranIndex = Math.floor(Math.random() * 5)
          newSeq.push(ranIndex)
      }
      return newSeq
  }

  setSteps() {
    switch (this.state.step) {
      case "Begin":
        this.setState({ step: "Listen the melody" })
        this.element =
          <Scale
            isPlayable={true}
            reportRecordedSeq={(seq) => this.checkWinner(seq)}
            reportInitialSeq={(seq) => this.setState({
              fixed_seq: seq
            })}
            reportPlayFinish={() => {this.setState({
              step: "Try to play the same melody"
            }); console.log("reported")}}
            noteNumber={5} // only works for 5 because don't know yet how to control time in transpose toneJs
            sequence={this.state.seq}
            bpm={140} />
        break;
      case "Listen the melody":
        this.setState({ step: "Scale Play" })
        break;
      case "Try to play the same melody":
        break;
      default:
        this.setState({ step: "Begin", seq: this.generateRandomSeq(5), record_seq: [] })
        this.element = null
        break;
    }
  }

  render() {
    return (
      <div className="gameboard">
        <div className="announcer" style={{width: "30vw"}} onClick={() => this.setSteps()}>
          {this.state.step}
        </div>
        {this.element}
      </div>
    );
  }
}
