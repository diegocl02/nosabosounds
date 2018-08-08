/* @flow */
import React from "react";
import "../css/mystyles.css";

type Props = {
  button: string,
  onPress: () => void,
}

export class StepButton extends React.Component<Props> {

  render() {
    return (
      <div
        className="announcer"
        onClick={this.props.onPress}
      >
        {this.props.button}
      </div>
    )
  }
}
