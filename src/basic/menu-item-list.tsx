import { ButtonProps } from "@material-ui/core/Button"
import FormatIndentDecrease from "@material-ui/icons/FormatIndentDecrease"
import FormatIndentIncrease from "@material-ui/icons/FormatIndentIncrease"
import FormatListBulleted from "@material-ui/icons/FormatListBulleted"
import FormatListNumbered from "@material-ui/icons/FormatListNumbered"
import { liftListItem, sinkListItem, wrapInList } from "prosemirror-schema-list"
import * as React from "react"
import { MenuContext } from "../MenuBar"
import { MenuItemButton } from "../MenuItem"
import { isNodeActive } from "../util"

export const NodeListBulleted: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { bullet_list } = view.state.schema.nodes
  const isActive = isNodeActive(bullet_list)(view.state)
  const disabled = isActive

  const toggle = () => wrapInList(bullet_list)(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} isActive={isActive} disabled={disabled}>
      <FormatListBulleted />
    </MenuItemButton>
  )
}

export const NodeListNumbered: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { ordered_list } = view.state.schema.nodes
  const isActive = isNodeActive(ordered_list)(view.state)
  const disabled = isActive

  const toggle = () => wrapInList(ordered_list)(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} isActive={isActive} disabled={disabled}>
      <FormatListNumbered />
    </MenuItemButton>
  )
}

export const NodeListIndentDecrease: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { list_item } = view.state.schema.nodes
  const disabled = !liftListItem(list_item)
  const toggle = () => liftListItem(list_item)(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} disabled={disabled}>
      <FormatIndentDecrease />
    </MenuItemButton>
  )
}

export const NodeListIndentIncrease: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const { list_item } = view.state.schema.nodes
  const disabled = !sinkListItem(list_item)(view.state)
  const toggle = () => sinkListItem(list_item)(view.state, view.dispatch)
  return (
    <MenuItemButton onToggle={toggle} disabled={disabled}>
      <FormatIndentIncrease />
    </MenuItemButton>
  )
}
