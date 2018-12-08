import * as React from "react"
import { ButtonProps } from "@material-ui/core/Button"
import { MenuItemButton } from "./MenuItem"
import { MenuContext } from "./MenuBar"
import { wrapInList } from "prosemirror-schema-list"
import FormatListBulleted from "@material-ui/icons/FormatListBulleted"
import { isNodeActive } from "./util"

export const NodeBulletList: React.SFC<ButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const isActive = isNodeActive(view.state.schema.nodes.bullet_list)(view.state)
  const toggle = () => wrapInList(view.state.schema.nodes.bullet_list)(view.state, view.dispatch)
  return (
    <MenuItemButton isActive={isActive} onToggle={toggle}>
      <FormatListBulleted />
    </MenuItemButton>
  )
}
