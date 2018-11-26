import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import * as React from "react"
import { MenuContext } from "./MenuBar"

const markActive = (type: MarkType) => (state: EditorState): boolean => {
  const { from, $from, to, empty } = state.selection

  return empty ? Boolean(type.isInSet(state.storedMarks || $from.marks())) : state.doc.rangeHasMark(from, to, type)
}

type TMenuItemProps = {
  mark: MarkType
} & React.HTMLAttributes<HTMLDivElement>

type TLeanMenuItemProps = {
  view: EditorView
} & TMenuItemProps

export class LeanMenuItemMark extends React.Component<TLeanMenuItemProps> {
  state = {
    isActive: this.isActive()
  }
  run = toggleMark(this.props.mark)
  onClick = () => {
    const { view } = this.props
    this.run(view.state, view.dispatch)
    this.setState({
      isActive: this.isActive()
    })
  }

  isActive() {
    return markActive(this.props.mark)(this.props.view.state)
  }

  render() {
    const { view, mark, style, ...rest } = this.props
    const resultStyle: React.CSSProperties = {
      display: "inline-block",
      fontWeight: this.state.isActive ? "bold" : "normal",
      ...style
    }

    return <div onClick={this.onClick} style={resultStyle} {...rest} />
  }
}

export const MenuItemMark: React.SFC<TMenuItemProps> = props => (
  <MenuContext.Consumer>{ctx => <LeanMenuItemMark view={ctx.view} {...props} />}</MenuContext.Consumer>
)

export const Strong: React.SFC<TMenuItemProps> = props => <MenuItemMark {...props}>B</MenuItemMark>
export const Em: React.SFC<TMenuItemProps> = props => (
  <MenuItemMark style={{ fontStyle: "italic" }} {...props}>
    I
  </MenuItemMark>
)
