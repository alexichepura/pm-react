import * as React from "react"
import { MenuContext } from "../MenuBar"
import { setBlockType } from "prosemirror-commands"
import MenuItem from "@material-ui/core/MenuItem"
import { NodeType } from "prosemirror-model"
import Menu from "@material-ui/core/Menu"
import Button from "@material-ui/core/Button"

type TBlockSelectItem = {
  name: string
  type: string
  attrs?: Record<string, any>
}

const createHeading = (level: number): TBlockSelectItem => ({
  name: "Heading " + level,
  type: "heading",
  attrs: { level }
})

const blocks: TBlockSelectItem[] = [
  {
    name: "Paragraph",
    type: "paragraph"
  },
  createHeading(1),
  createHeading(2),
  createHeading(3),
  createHeading(4),
  createHeading(5),
  createHeading(6)
]

type TMenuItemButtonProps = {}
export const MenuBlockTypeSelect: React.SFC<TMenuItemButtonProps> = () => {
  const { view } = React.useContext(MenuContext)
  const [open, setOpen] = React.useState(false)
  const { paragraph, heading } = view.state.schema.nodes
  const map: Record<string, NodeType> = { paragraph, heading }

  const selected = blocks.find(block => !setBlockType(map[block.type], block.attrs)(view.state))
  const setBlock = (block: TBlockSelectItem) => {
    setBlockType(map[block.type], block.attrs)(view.state, view.dispatch)
    setOpen(false)
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>{(selected && selected.name) || "Select block"}</Button>
      <Menu open={open} onClose={() => setOpen(false)}>
        {blocks.map(block => {
          return (
            <MenuItem
              key={block.name}
              selected={selected && selected.type === block.type}
              onClick={() => setBlock(block)}
            >
              {block.name}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
