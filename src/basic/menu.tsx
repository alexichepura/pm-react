import * as React from "react"
import { MenuBar } from "../MenuBar"
import { MarkLink } from "./menu-item-link"
import { MarkCode, MarkEm, MarkStrong } from "./menu-item"
import { TEditorView } from "./schema"
import { NodeListBulleted, NodeListNumbered, NodeListIndentDecrease, NodeListIndentIncrease } from "./menu-item-list"
import { NodeHistoryRedo, NodeHistoryUndo } from "./menu-item-history"

type TMenuBasicProps = {
  view: TEditorView | null
}

export const MenuBasic: React.SFC<TMenuBasicProps> = props => {
  return (
    <MenuBar view={props.view}>
      <NodeHistoryUndo />
      <NodeHistoryRedo />
      <MarkStrong />
      <MarkEm />
      <MarkCode />
      <MarkLink />
      <NodeListBulleted />
      <NodeListNumbered />
      <NodeListIndentDecrease />
      <NodeListIndentIncrease />
    </MenuBar>
  )
}
