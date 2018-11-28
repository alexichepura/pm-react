import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import * as React from "react"
import { MenuContext } from "./MenuBar"
import Button, { ButtonProps } from "@material-ui/core/Button"
import FormatBold from "@material-ui/icons/FormatBold"
import FormatItalic from "@material-ui/icons/FormatItalic"
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles"

const markActive = (type: MarkType) => (state: EditorState): boolean => {
  const { from, $from, to, empty } = state.selection

  return empty ? Boolean(type.isInSet(state.storedMarks || $from.marks())) : state.doc.rangeHasMark(from, to, type)
}

const jssStyles = () =>
  createStyles({
    root: {
      boxShadow: "none",
      borderRadius: 0
    }
  })

type TMenuItemState = {
  isActive: boolean
}
type TMenuItemProps = {
  mark: MarkType
} & ButtonProps
type TLeanMenuItemProps = {
  view: EditorView
} & TMenuItemProps &
  WithStyles<typeof jssStyles, false>
export class LeanMenuItemMark extends React.Component<TLeanMenuItemProps, TMenuItemState> {
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

  static getDerivedStateFromProps(props: TLeanMenuItemProps, state: TMenuItemState): TMenuItemState | null {
    const newIsActive = markActive(props.mark)(props.view.state)
    if (newIsActive !== state.isActive) {
      return { isActive: newIsActive }
    }
    return null
  }

  render() {
    const { view, mark, style, ...rest } = this.props
    const resultStyle: React.CSSProperties = {
      display: "inline-block",
      ...style
    }

    return (
      <Button
        size="small"
        variant={this.state.isActive ? "contained" : "text"}
        color={this.state.isActive ? "primary" : "default"}
        onClick={this.onClick}
        style={resultStyle}
        {...rest}
      />
    )
  }
}

const StyledMenyItemMark = withStyles(jssStyles)(LeanMenuItemMark)

export const MenuItemMark: React.SFC<TMenuItemProps> = props => (
  <MenuContext.Consumer>{ctx => <StyledMenyItemMark view={ctx.view} {...props} />}</MenuContext.Consumer>
)

export const Strong: React.SFC<TMenuItemProps> = props => (
  <MenuItemMark {...props}>
    <FormatBold />
  </MenuItemMark>
)
export const Em: React.SFC<TMenuItemProps> = props => (
  <MenuItemMark style={{ fontStyle: "italic" }} {...props}>
    <FormatItalic />
  </MenuItemMark>
)
