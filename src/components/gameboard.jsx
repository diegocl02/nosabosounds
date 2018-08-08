/* @flow */
import React from "react";
import { Scale } from "./scale";
import "../css/mystyles.css";
import { config } from "../config";
import { StepButton } from "./stepbutton";
import { StepInfo } from "./stepinfo";

type Props = {
  wins: number,
  loses: number,
  OnWin: () => void,
  OnLose: () => void,
  difficulty: string
};

type State = {
  isWinner: number,
  step: number,
  seq: number[],
  record_seq: number[]
}
export class Gameboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let notesSeq = config.difficulty[props.difficulty].notesInSequence;
    let notesSca = config.difficulty[props.difficulty].notesInScale;

    this.state = {
      isWinner: 0,
      step: 0,
      seq: this.generateRandomSeq(notesSeq, notesSca),
      record_seq: []
    };
  }

  steps = {
    [0]: { button: "Begin", info: "Press Begin to start!" },
    [1]: { button: false, info: "First, listen to the melody" },
    [2]: { button: false, info: "Now, try to play the same melody" },
    [3]: { button: "Play Again?", info: "You Win" },
    [4]: { button: "Play Again?", info: "You Lose" }
  };

  generateScale = () => (
    <Scale
      isPlayable={this.state.step === 2}
      reportRecordedSeq={seq => this.checkWinner(seq)}
      reportPlayFinish={() =>
        this.setState({
          step: 2
        })
      }
      noteNumber={config.difficulty[this.props.difficulty].notesInScale}
      sequence={this.state.seq}
      bpm={120}
    />
  );

  checkWinner(seq: number[]) {
    let seq_equal = this.state.seq.join() === seq.join();
    this.setState({
      step: seq_equal ? 3 : 4,
      isWinner: seq_equal ? 1 : 0,
      record_seq: seq
    });
    if (seq_equal) this.props.OnWin();
    else this.props.OnLose();
  }

  generateRandomSeq(numberOfNotes: number, maxScale: number) {
    let newSeq = [];
    for (let i = 0; i < numberOfNotes; i++) {
      let ranIndex = Math.floor(Math.random() * maxScale);
      newSeq.push(ranIndex);
    }
    return newSeq;
  }

  setSteps() {
    switch (this.state.step) {
      case 0:
        this.setState({ step: 1 });
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        this.setState({
          step: 0,
          seq: this.generateRandomSeq(
            config.difficulty[this.props.difficulty].notesInSequence,
            config.difficulty[this.props.difficulty].notesInScale
          ),
          record_seq: []
        });
        break;
    }
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.difficulty !== this.props.difficulty) {
      this.setState({
        step: 0,
        seq: this.generateRandomSeq(
          config.difficulty[this.props.difficulty].notesInSequence,
          config.difficulty[this.props.difficulty].notesInScale
        ),
        record_seq: []
      });
    }
  }

  render() {
    let step = this.steps[this.state.step];

    return (
      <div className="gameboard">
        <StepInfo info={this.steps[this.state.step].info} />
        <div>{this.state.step !== 0 ? this.generateScale() : null}</div>
        {step.button !== false ? (
          <StepButton
            button={this.steps[this.state.step].button}
            onPress={() => this.setSteps()}
          />
        ) : null}
      </div>
    );
  }
}
