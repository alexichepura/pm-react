import * as React from "react"
import { render } from "react-dom"
import { Editor } from "./Editor"

export class Example extends React.Component<{}> {
  render() {
    return <Editor />
  }
}

render(<Example />, document.getElementById("app"))
