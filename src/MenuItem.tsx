import Button, { ButtonProps } from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"
import * as React from "react"
import { MenuContext } from "./MenuBar"

type TUseMenuItemContextReturn = [boolean, (attrs?: any) => void]
export const useMenuItemContext = (mark: MarkType): TUseMenuItemContextReturn => {
  const { view } = React.useContext(MenuContext)
  const isActive = !toggleMark(mark)(view.state)
  return [
    isActive,
    function(attrs?: any) {
      toggleMark(mark, attrs)(view.state, view.dispatch)
    }
  ]
}

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    borderRadius: 0,
    display: "inline-block",
    padding: 0,
    minWidth: 0,
    width: "36px",
    height: "36px"
  }
})
type TMenuItemButtonProps = {
  isActive?: boolean
  onToggle: () => void
} & ButtonProps
export const MenuItemButton: React.SFC<TMenuItemButtonProps> = props => {
  const classes = useStyles({})
  const { isActive = false, onToggle, ...rest } = props
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
