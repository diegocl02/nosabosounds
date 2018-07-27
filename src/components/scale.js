import React, { Component } from 'react'
import Tone from 'tone'
import { Note } from './note'

export class Scale extends Component {

    notes = ["C4", "D4", "E4", "G4", "A4"]
    newNotes = []

    constructor(props) {
        super(props)
        this.state = {
            note: null,
            recordedNotes: [],
            notePlaying: null
        }
    }

    generateRandomSeq(nSeq) {
        let newSeq = []
        for (let i = 0; i < nSeq; i++) {
            let ranIndex = Math.floor(Math.random() * 5)
            newSeq.push([this.notes[ranIndex], ranIndex])
        }
        return newSeq
    }

    playInitialNotes() {
        let synth = new Tone.Synth().toMaster()
        let time = '8n'
        console.log(this.newNotes)

        var melody = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, '4n', time);
        }, this.newNotes).start();

        melody.start(0).stop("1:1");
        melody.loop = 1
        Tone.Transport.bpm.value = 60
        Tone.Transport.start(1);
    }

    playNote(n) {
        let synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(this.notes[n], "8n");

        let newRecordedNotes = [...this.state.recordedNotes]
        newRecordedNotes.push(n)
        if (newRecordedNotes.length === 5) {
            this.props.reportRecordedSeq(newRecordedNotes)
            this.setState({
                recordedNotes: []
            })
        } else if (newRecordedNotes.length < 5) {
            this.setState({
                recordedNotes: newRecordedNotes
            })
        }
    }

    componentDidMount() {
        let newSeq = this.generateRandomSeq(5)
        this.newNotes = newSeq.map((el) => { return el[0] })

        if (this.props.isPlayable) {
            this.playInitialNotes()
            let i = 0

            this.props.reportInitialSeq(newSeq.map(el => el[1]))
            setInterval(() => {
                if (i < 5) {
                    this.setState({
                        note: this.newNotes[i][0]
                    })
                    i++;
                }
            }, 1000)
        }
    }

    handleNoteClicked(n) {
        this.playNote(n)

        this.setState({
            notePlaying: n
        })
    }



    createNoteBoard() {
        let element = new Array(this.props.noteNumber).fill(null)
        let newElement = element.map((element, index) =>
            <div>
                <Note
                    size={"30px"}
                    color={index === this.state.notePlaying ? "red" : "black"}
                    onNoteClick={() => this.handleNoteClicked(index)}
                />
            </div>
        )
        return newElement
    }

    render() {
        console.log(this.state)
        return (
            <div className="noteboard">
                {this.createNoteBoard()}
            </div>
        )
    }
}
