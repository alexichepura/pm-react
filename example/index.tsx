import * as React from "react"
import { render } from "react-dom"
import { MenuBar } from "../src/MenuBar"

export class Example extends React.Component<{}> {
  render() {
    return <MenuBar />
  }
}

render(<Example />, document.getElementById("app"))
