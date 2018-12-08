import * as React from "react"
import { MenuBar } from "../MenuBar"
import { MarkLink } from "./menu-item-link"
import { MarkCode, MarkEm, MarkStrong } from "./menu-item"
import { TEditorView } from "./schema"
import { NodeListBulleted, NodeListNumbered } from "./menu-item-list"

type TMenuBasicProps = {
  view: TEditorView | null
}

export const MenuBasic: React.SFC<TMenuBasicProps> = props => {
  return (
    <MenuBar view={props.view}>
      <MarkStrong />
      <MarkEm />
      <MarkCode />
      <MarkLink />
      <NodeListBulleted />
      <NodeListNumbered />
    </MenuBar>
  )
}
