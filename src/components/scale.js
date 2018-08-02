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
        Tone.Transport.stop()
        Tone.Transport.cancel()
        let newSeq = this.props.sequence
        this.newNotes = newSeq.map((el) => { return this.notes[el] })

        let synth = new Tone.Synth().toMaster()
        let time = '8n'
        let i = 0;
        var melody = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, '4n', time);

            Tone.Draw.schedule(() => {
              this.setState({
                  notePlaying: newSeq[i++]
              })
              if (i === newSeq.length) {
                setTimeout(() => {
                  this.setState({
                      notePlaying: null
                  })
                  this.props.reportPlayFinish()
                }, 500)
              }
            })
        }, this.newNotes);

        melody.start("4n").stop("1:2");
        melody.loop = 1
        Tone.Transport.bpm.value = this.props.bpm
        Tone.Transport.start();
    }

    playNote(n) {
        let numberOfNotes = this.props.sequence.length
        let synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(this.notes[n], "8n");
        let newRecordedNotes = [...this.state.recordedNotes]

        newRecordedNotes.push(n)
        if (newRecordedNotes.length === numberOfNotes) {
            this.props.reportRecordedSeq(newRecordedNotes)
            this.setState({
                recordedNotes: []
            })
        } else if (newRecordedNotes.length < numberOfNotes) {
            this.setState({
                recordedNotes: newRecordedNotes
            })
        }
    }

    componentDidUpdate(nextProps) {
      // console.log("Did update!", nextProps.sequence.join(',') !== this.props.sequence.join(','), nextProps.sequence, this.props.sequence)
        if (nextProps.sequence.join(',') !== this.props.sequence.join(',')) {
          this.playInitialNotes()
          console.log("Props updated!")
        }
    }

    componentDidMount() {
        setTimeout(() => this.playInitialNotes(), 500)
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
                    size={"10vw"}
                    color={index === this.state.notePlaying ? "#FA8072" : "black"}
                    onNoteClick={() => this.handleNoteClicked(index)}
                />
            </div>
        )
        return newElement
    }

    render() {
        // console.log('State in Scale', this.state)
        return (
            <div className="noteboard">
                {this.createNoteBoard()}
            </div>
        )
    }
}
