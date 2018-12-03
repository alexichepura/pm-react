import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core"
import Button, { ButtonProps } from "@material-ui/core/Button"
import Link from "@material-ui/icons/Link"
import * as React from "react"
import { useContext, useState } from "react"
import { MenuContext } from "./MenuBar"
import { MenuItemButton, useMenuItemContext } from "./MenuItem"
import { MarkType } from "prosemirror-model"

export const MarkLink: React.SFC<ButtonProps> = props => {
  const { view } = useContext(MenuContext)
  const [isOpen, setOpen] = useState(false)
  const linkMark: MarkType = view.state.schema.marks.link
  const [isActive, toggle] = useMenuItemContext(linkMark)
  const mark = linkMark.isInSet(view.state.selection.$from.marks())
  let attrs: TLinkAttributes = Object.assign(
    {
      href: ""
    },
    mark ? mark.attrs : {}
  )

  const handleToggle = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    view.focus()
  }
  const ok = (link: TLinkAttributes) => {
    toggle(link)
    close()
  }
  return (
    <>
      <MenuItemButton isActive={isActive} onToggle={handleToggle} {...props}>
        <Link />
      </MenuItemButton>
      <LinkDialog key={attrs.href} isOpen={isOpen} close={close} ok={ok} attrs={attrs} />
    </>
  )
}

type TLinkAttributes = {
  href: string
}
type TLinkDialogProps = {
  isOpen: boolean
  ok: (link: TLinkAttributes) => void
  close: () => void
  attrs: TLinkAttributes | null
}
export const LinkDialog: React.SFC<TLinkDialogProps> = props => {
  const { ok, close, isOpen, attrs } = props
  const [href, setHref] = useState(attrs ? attrs.href : "")

  const onOk = () => {
    ok({ href })
  }
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Link</DialogTitle>
      <DialogContent>
        <TextField label="href" value={href} onChange={e => setHref(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onOk}>OK</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
