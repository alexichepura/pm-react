import * as React from "react"
import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"

const markActive = (type: any) => (state: any) => {
  const { from, $from, to, empty } = state.selection

  return empty ? type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type)
}

export class Strong extends React.Component<{ mark: MarkType<any>; getView: any }> {
  run = toggleMark(this.props.mark)
  onClick = () => {
    const view = this.props.getView()
    this.run(view.state, view.dispatch)
  }

  render() {
    return (
      <button style={{ fontWeight: markActive(this.props.mark) ? "bold" : "normal" }} onClick={this.onClick}>
        strong
      </button>
    )
  }
}
