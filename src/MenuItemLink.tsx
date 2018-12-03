import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import Button, { ButtonProps } from "@material-ui/core/Button"
import Link from "@material-ui/icons/Link"
import * as React from "react"
import { useContext, useState } from "react"
import { MenuContext } from "./MenuBar"
import { MenuItemButton, useMenuItemContext } from "./MenuItem"

export const MarkLink: React.SFC<ButtonProps> = props => {
  const ctx = useContext(MenuContext)
  const [isOpen, setOpen] = useState(false)
  const [isActive, toggle] = useMenuItemContext(ctx.view.state.schema.marks.link)

  const handleToggle = () => {
    if (isActive) {
      toggle()
    } else {
      setOpen(true)
    }
  }
  const close = () => setOpen(false)
  const ok = () => {
    toggle()
    close()
  }
  return (
    <>
      <MenuItemButton isActive={isActive} onToggle={handleToggle} {...props}>
        <Link />
      </MenuItemButton>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Link</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={ok}>OK</Button>
          <Button onClick={close}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
