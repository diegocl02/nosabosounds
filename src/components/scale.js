import React, {Component} from 'react'
import Tone from 'tone'

export class Scale extends Component {

    notes = ["C4", "D4", "E4", "G4", "A4"]

    constructor(props){
        super(props)
        this.state = {

        }
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

    render(){
        return (
            <div onClick={() => {this.playSound()}}> Hello </div>
        )
    }
}