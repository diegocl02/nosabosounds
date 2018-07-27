import React, {Component} from 'react'
import Tone from 'tone'
import {Note} from './note'

export class Scale extends Component {

    notes = ["C4", "D4", "E4", "G4", "A4"]

    constructor(props){
        super(props)
        this.state = {
            notePlaying: null
        }
        this.createNoteBoard();
    }

    playSound(){
        let synth = new Tone.Synth().toMaster()
        let time = '8n'

        var melody = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, '4n', time);
          }, this.notes).start();

        melody.start("1m").stop("2m");
        Tone.Transport.start();
    }

    handleNoteClicked(n){
      this.setState({
        notePlaying: n
      })
    }



    createNoteBoard() {
      let element = new Array(this.props.noteNumber).fill(null)
      let newElement = element.map((element, index) =>
            <div>
              <Note
                size = {"30px"}
                color = {index === this.state.notePlaying ? "red" : "black"}
                onNoteClick = {() => this.handleNoteClicked(index)}
              />
            </div>
          )
      return newElement
    }

    render(){
      console.log(this.state)
        return (
          <div className="noteboard">
            {this.createNoteBoard()}
          </div>
        )
    }
}
