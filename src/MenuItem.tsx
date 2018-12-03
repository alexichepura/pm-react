import Button, { ButtonProps } from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { toggleMark } from "prosemirror-commands"
import { MarkType } from "prosemirror-model"
import * as React from "react"
import { MenuContext } from "./MenuBar"
import { isMarkActive } from "./util"

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    borderRadius: 0,
    display: "inline-block"
  }
})

type TMenuItemProps = {
  mark: MarkType
} & ButtonProps
export const MenuItemMark: React.SFC<TMenuItemProps> = props => {
  const {
    view: { state, dispatch }
  } = React.useContext(MenuContext)
  const classes = useStyles({})
  const { mark, onClick, ...rest } = props
  const isActive = isMarkActive(mark)(state)
  const _onClick =
    onClick ||
    function() {
      toggleMark(mark)(state, dispatch)
    }
  return (
    <Button
      size="small"
      variant={isActive ? "contained" : "text"}
      color={isActive ? "primary" : "default"}
      onClick={_onClick}
      classes={classes}
      {...rest}
    />
  )
}
