import React from 'react';
import { Scale } from './scale';
import '../styles.css';
import { config } from '../config'

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    let notesSeq = config.difficulty[props.difficulty].notesInSequence
    let notesSca = config.difficulty[props.difficulty].notesInScale

    this.state = {
      isWinner: 0,
      step: "Begin",
      seq: this.generateRandomSeq(notesSeq, notesSca),
      record_seq: []
    }
  }

  generateScale = () =>  <Scale
      isPlayable={this.state.step === "Try to play the same melody"}
      reportRecordedSeq={(seq) => this.checkWinner(seq)}
      reportPlayFinish={() => this.setState({
        step: "Try to play the same melody"
      })}
      noteNumber={config.difficulty[this.props.difficulty].notesInScale}
      sequence={this.state.seq}
      bpm={120} />

  checkWinner(seq){
    let seq_equal = this.state.seq.join() === seq.join()
    this.setState({
          step: seq_equal ? "You Win, next?" : "You Lose, Try again?",
          isWinner: seq_equal ? 1 : 0,
          record_seq: seq
    })
    if (seq_equal) this.props.OnWin()
    else this.props.OnLose()
  }

  generateRandomSeq(numberOfNotes, maxScale) {
      let newSeq = []
      for (let i = 0; i < numberOfNotes; i++) {
          let ranIndex = Math.floor(Math.random() * maxScale)
          newSeq.push(ranIndex)
      }
      return newSeq
  }

  setSteps() {
    switch (this.state.step) {
      case "Begin":
        this.setState({ step: "Listen the melody" })
        break;
      case "Listen the melody":
        break;
      case "Try to play the same melody":
        break;
      default:
        this.setState({
          step: "Begin",
          seq: this.generateRandomSeq(config.difficulty[this.props.difficulty].notesInSequence,
            config.difficulty[this.props.difficulty].notesInScale), record_seq: [] })
        break;
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.difficulty !== this.props.difficulty) {
      this.setState({
        step: "Begin",
        seq: this.generateRandomSeq(config.difficulty[this.props.difficulty].notesInSequence,
          config.difficulty[this.props.difficulty].notesInScale), record_seq: [] })
    }
  }

  render() {
    // console.log("config", config)
    console.log("state in gameboard", this.state, this.props)
    // console.log('isplayable',this.state.step === "Try to play the same melody")
    // console.log('config',config.difficulty[this.props.difficulty])
    return (
      <div className="gameboard">
        <div className="announcer" style={{width: "30vw"}} onClick={() => this.setSteps()}>
          {this.state.step}
        </div>
        {this.state.step !== 'Begin' ? this.generateScale() : null}
      </div>
    );
  }
}
