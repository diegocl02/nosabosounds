/* @flow */
import React from "react";
import "../css/mystyles.css";

type Props = {
  info: string,
}

export class StepInfo extends React.Component<Props> {

  render() {
    let element = []

    element.push(
      <div
        className="announcerAlternative"
      >
        {this.props.info}
      </div>
    )

    return element
  }
}
