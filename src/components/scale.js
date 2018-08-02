import React, { Component } from 'react'
import Tone from 'tone'
import { Note } from './note'
import { config } from '../config'

export class Scale extends Component {

    notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"]
    newNotes = []

    constructor(props) {
        super(props)
        this.state = {
            note: null,
            recordedNotes: [],
            notePlaying: null
        }
    }

    playInitialNotes() {
        Tone.Transport.stop()
        Tone.Transport.cancel()
        let newSeq = this.props.sequence
        let seqLen = this.props.sequence.length
        this.newNotes = newSeq.map((el) => { return this.notes[el] })

        let synth = new Tone.Synth().toMaster()
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

        let bars = Math.floor(seqLen / 4)
        let quarters = seqLen % 4
        melody.start(0).stop(`${bars}:${quarters}`); // "1:1 means 1 bar and 1 quarter"
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

    componentWillUpdate(){}

    componentDidMount() {
        setTimeout(() => this.playInitialNotes(), 500)
    }

    handleNoteClicked(n) {
        this.playNote(n)
        this.setState({
            notePlaying: n
        })
    }

    noteStyle = {
        transition: `all 0.3s`
    }

    createNoteBoard() {
        let element = new Array(this.props.noteNumber).fill(null)
        let newElement = element.map((element, index) =>
            // <div>
            //     <Note
            //         size={"10vw"}
            //         color={index === this.state.notePlaying ? "#FA8072" : "black"}
            //         onNoteClick={() => {if (this.props.isPlayable) this.handleNoteClicked(index)}}
            //     />
            // </div>
            <div style={{ ...this.noteStyle, fill: (index === this.state.notePlaying ? config.theme.colors.alternative3 : "black"), cursor: "pointer"}}>
            <Note
                size={"10vw"}
                color={"inherit"}
                onNoteClick={() => {if (this.props.isPlayable) this.handleNoteClicked(index)}}
            />
        </div>
            
        )
        return newElement
    }

    render() {
        // console.log('State in Scale', this.state)
        // console.log('Props in Scale', this.props)
        return (
            <div className="noteboard">
                {this.createNoteBoard()}
            </div>
        )
    }
}
