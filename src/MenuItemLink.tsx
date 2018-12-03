import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import Button, { ButtonProps } from "@material-ui/core/Button"
import Link from "@material-ui/icons/Link"
import * as React from "react"
import { useContext, useState } from "react"
import { MenuContext } from "./MenuBar"
import { MenuItemMark } from "./MenuItem"

export const MarkLink: React.SFC<ButtonProps> = props => {
  const ctx = useContext(MenuContext)
  const [isOpen, setOpen] = useState(false)

  const onOpen = () => setOpen(true)
  const onOk = () => setOpen(false)
  const onClose = () => setOpen(false)
  return (
    <>
      <MenuItemMark mark={ctx.view.state.schema.marks.link} onClick={onOpen} {...props}>
        <Link />
      </MenuItemMark>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Link</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={onOk}>OK</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
