import Button, { ButtonProps } from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"
import * as React from "react"
import { MenuContext } from "./MenuBar"
import { isMarkActive } from "./util"

type TUseMenuItemContextReturn = [boolean, () => void]
export const useMenuItemContext = (mark: MarkType): TUseMenuItemContextReturn => {
  const { view } = React.useContext(MenuContext)
  const isActive = isMarkActive(mark)(view.state)
  return [
    isActive,
    function() {
      toggleMark(mark)(view.state, view.dispatch)
    }
  ]
}

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    borderRadius: 0,
    display: "inline-block"
  }
})
type TMenuItemButtonProps = {
  isActive: boolean
  onToggle: () => void
} & ButtonProps
export const MenuItemButton: React.SFC<TMenuItemButtonProps> = props => {
  const classes = useStyles({})
  const { isActive, onToggle, ...rest } = props
  return (
    <Button
      size="small"
      variant={isActive ? "contained" : "text"}
      color={isActive ? "primary" : "default"}
      classes={classes}
      onClick={onToggle}
      {...rest}
    />
  )
}

type TMenuItemProps = {
  mark: MarkType
} & ButtonProps
export const MenuItemMark: React.SFC<TMenuItemProps> = props => {
  const { mark, ...rest } = props
  const [isActive, toggle] = useMenuItemContext(mark)
  return <MenuItemButton isActive={isActive} onToggle={toggle} {...rest} />
}
