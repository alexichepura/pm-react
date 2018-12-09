import { ButtonProps } from "@material-ui/core/Button"
import { undo, redo } from "prosemirror-history"
import Undo from "@material-ui/icons/Undo"
import Redo from "@material-ui/icons/Redo"
import * as React from "react"
import { MenuContext } from "../MenuBar"
import { MenuItemButton } from "../MenuItem"

export const NodeHistoryUndo: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const disabled = !undo(view.state)
  const toggle = () => undo(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} disabled={disabled}>
      <Undo />
    </MenuItemButton>
  )
}
export const NodeHistoryRedo: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const disabled = !redo(view.state)
  const toggle = () => redo(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} disabled={disabled}>
      <Redo />
    </MenuItemButton>
  )
}
