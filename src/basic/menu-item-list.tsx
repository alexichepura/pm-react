import * as React from "react"
import { ButtonProps } from "@material-ui/core/Button"
import { MenuItemButton } from "../MenuItem"
import { MenuContext } from "../MenuBar"
import { wrapInList } from "prosemirror-schema-list"
import FormatListBulleted from "@material-ui/icons/FormatListBulleted"
import FormatListNumbered from "@material-ui/icons/FormatListNumbered"
import { isNodeActive } from "../util"

export const NodeListBulleted: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { bullet_list } = view.state.schema.nodes
  const isActive = isNodeActive(bullet_list)(view.state)
  console.log(isActive)
  const toggle = () => wrapInList(bullet_list)(view.state, view.dispatch)
  return (
    <MenuItemButton isActive={isActive} onToggle={toggle}>
      <FormatListBulleted />
    </MenuItemButton>
  )
}

export const NodeListNumbered: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { ordered_list } = view.state.schema.nodes
  const isActive = isNodeActive(ordered_list)(view.state)
  const toggle = () => wrapInList(ordered_list)(view.state, view.dispatch)
  return (
    <MenuItemButton isActive={isActive} onToggle={toggle}>
      <FormatListNumbered />
    </MenuItemButton>
  )
}
