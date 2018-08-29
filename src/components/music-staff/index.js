// @flow
import * as React from "react";
import type { Node } from "react";
import { Clef } from "../clef";

const SCALE = 100;

type Props = {
  notes: [string, Node][] // first the note (i.e C4, D5), and second the note element
};

/**
 * Many challenges still pending:
 * - Make it work with different svg, notes and not only circles
 * - Calulate note position by the name of the note (i.e C4, D3, E8)
 * - Add Cleff, time signature, keys icons
 * - Calculate a better separation between notes
 * - Implement notes that can be placed beyond the 1st and 5th staff lines
 */

export class MusicStaff extends React.Component<Props> {
  calculateWidth() {
    const notesSize = this.props.notes.length * 2;
    const clefSize = 3; // size of the clef hardcoded
    const timeSize = 2; // size of the time signature hardcoded
    const width = SCALE * (notesSize + clefSize + timeSize);

    return width;
  }

  calculateViewBox() {
    const diffMaxMinNote = 7; // asuming there are not notes abover or below 1st orf 5th line
    const height = SCALE * diffMaxMinNote;

    return `0 0 ${this.calculateWidth()} ${height}`;
  }

  staffLines = () => {
    const dummyArr = new Array(5).fill(1);
    const width = this.calculateWidth();

    return dummyArr.map((el: number, i: number) => {
      return (
        <path key={i} stroke="black" d={`M 0 ${(i + 1) * SCALE} H${width}`} />
      );
    });
  };

  // Currently the scale used on the app starts in E4 so
  // the first position is fixed (first note in the 1st line)
  notesPositioned = () => {
    return this.props.notes.map((el, i) => {
      let positionX = `${i * SCALE * 1.7 + 5 * SCALE}`;
      let positionY = `${(5 - 0.5 - i / 2) * SCALE}`;

      return (
        <svg x={positionX} y={positionY}>
          {el[1]}
        </svg>
      );
    });
  };

  clefPositioned = () => {
    return <svg x={-200} y={-50}>
      <Clef size={"1000"} color={"black"} scale={"10"}/>
    </svg>
  }

  render() {
    return (
      <svg viewBox={this.calculateViewBox()}>
        {this.staffLines()}
        {this.clefPositioned()}
        {this.notesPositioned()}
      </svg>
    );
  }
}
