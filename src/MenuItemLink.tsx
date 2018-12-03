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
  return (
    <MenuItemMark mark={ctx.view.state.schema.marks.link} onClick={() => setOpen(true)} {...props}>
      <Link />
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <DialogTitle>Link</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </MenuItemMark>
  )
}
