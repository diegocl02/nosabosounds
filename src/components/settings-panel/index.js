// @flow
import React from 'react'

type Props = {
  wins: number,
  loses: number,
  difficulty: string,

  onChangedDifficulty: (diff: string) => void
}

export class SettingsPanel extends React.Component<Props> {
  render(){
    const buttonClass = 'button is-medium'
    return (
      <div className={"section"}>
        <div className={"columns content"}>
          <div className={"column"} />
          <div className={"column has-text-centered"}>
            <h3>Wins: {this.props.wins}</h3>
            <h3>Loses: {this.props.loses}</h3>
          </div>
          <div className={"column buttons has-text-centered"}>
            <div
              className={buttonClass + (this.props.difficulty === "easy" ? " is-primary" : "")}
              onClick={() => this.props.onChangedDifficulty("easy")}
            >
              Easy
            </div>
            <div
              className={buttonClass + (this.props.difficulty === "medium" ? " is-warning" : "")}
              onClick={() => this.props.onChangedDifficulty("medium")}
            >
              Medium
            </div>
            <div
              className={buttonClass + (this.props.difficulty === "hard" ? " is-danger" : "")}
              onClick={() => this.props.onChangedDifficulty("hard")}
            >
              Hard
            </div>
          </div>
        </div>
      </div>
    )
  }
}
