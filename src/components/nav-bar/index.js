// @flow
import React from 'react'

type Props = {
  brandName: string
}

export class NavBar extends React.Component<Props> {

  render(){
    return (
      <nav className={"navbar is-primary"}>
        <div className={"container"}>
          <div className={"navbar-brand"}>
            <h1 className={"navbar-item"}>{this.props.brandName}</h1>
          </div>
        </div>
      </nav>
    )
  }
}
