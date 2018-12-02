import { ButtonProps } from "@material-ui/core/Button"
import Code from "@material-ui/icons/Code"
import FormatBold from "@material-ui/icons/FormatBold"
import FormatItalic from "@material-ui/icons/FormatItalic"
import * as React from "react"
import { MenuContext } from "./MenuBar"
import { MenuItemMark } from "./MenuItem"

export const MarkStrong: React.SFC<ButtonProps> = props => {
  const ctx = React.useContext(MenuContext)
  return (
    <MenuItemMark mark={ctx.view.state.schema.marks.strong} {...props}>
      <FormatBold />
    </MenuItemMark>
  )
}
export const MarkEm: React.SFC<ButtonProps> = props => {
  const ctx = React.useContext(MenuContext)
  return (
    <MenuItemMark mark={ctx.view.state.schema.marks.em} style={{ fontStyle: "italic" }} {...props}>
      <FormatItalic />
    </MenuItemMark>
  )
}
export const MarkCode: React.SFC<ButtonProps> = props => {
  const ctx = React.useContext(MenuContext)
  return (
    <MenuItemMark mark={ctx.view.state.schema.marks.code} {...props}>
      <Code />
    </MenuItemMark>
  )
}
