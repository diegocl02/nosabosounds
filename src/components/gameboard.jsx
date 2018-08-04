import React from "react";
import { Scale } from "./scale";
import "../css/mystyles.css";
import { config } from "../config";

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    let notesSeq = config.difficulty[props.difficulty].notesInSequence;
    let notesSca = config.difficulty[props.difficulty].notesInScale;

    this.state = {
      isWinner: 0,
      step: this.steps[0],
      seq: this.generateRandomSeq(notesSeq, notesSca),
      record_seq: []
    };
  }

  steps = {
    0: "Begin",
    1: "You Win, play Again?",
    2: "You Lose, Try again?"
  };

  generateScale = () => (
    <Scale
      isPlayable={this.state.step === "Now, try to play the same melody"}
      reportRecordedSeq={seq => this.checkWinner(seq)}
      reportPlayFinish={() =>
        this.setState({
          step: "Now, try to play the same melody"
        })
      }
      noteNumber={config.difficulty[this.props.difficulty].notesInScale}
      sequence={this.state.seq}
      bpm={120}
    />
  );

  checkWinner(seq) {
    let seq_equal = this.state.seq.join() === seq.join();
    this.setState({
      step: seq_equal ? "You Win, play Again?" : "You Lose, Try again?",
      isWinner: seq_equal ? 1 : 0,
      record_seq: seq
    });
    if (seq_equal) this.props.OnWin();
    else this.props.OnLose();
  }

  generateRandomSeq(numberOfNotes, maxScale) {
    let newSeq = [];
    for (let i = 0; i < numberOfNotes; i++) {
      let ranIndex = Math.floor(Math.random() * maxScale);
      newSeq.push(ranIndex);
    }
    return newSeq;
  }

  setSteps() {
    switch (this.state.step) {
      case "Begin":
        this.setState({ step: "First listen to the melody..." });
        break;
      case "First listen to the melody...":
        break;
      case "Now, try to play the same melody":
        break;
      default:
        this.setState({
          step: "Begin",
          seq: this.generateRandomSeq(
            config.difficulty[this.props.difficulty].notesInSequence,
            config.difficulty[this.props.difficulty].notesInScale
          ),
          record_seq: []
        });
        break;
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.difficulty !== this.props.difficulty) {
      this.setState({
        step: "Begin",
        seq: this.generateRandomSeq(
          config.difficulty[this.props.difficulty].notesInSequence,
          config.difficulty[this.props.difficulty].notesInScale
        ),
        record_seq: []
      });
    }
  }

  render() {
    // console.log("state in gameboard", this.state, this.props)
    return (
      <div className="gameboard">
        <div
          className={
            this.state.step === this.steps[0] ||
            this.state.step === this.steps[1] ||
            this.state.step === this.steps[2]
              ? "announcer"
              : "announcerAlternative"
          }
          style={{ width: "30vw" }}
          onClick={() => this.setSteps()}
        >
          {this.state.step}
        </div>
        {this.state.step !== "Begin" ? this.generateScale() : null}
      </div>
    );
  }
}
