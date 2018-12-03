import * as React from "react"
import { MenuBar } from "./MenuBar"
import { MarkLink } from "./MenuItemLink"
import { MarkCode, MarkEm, MarkStrong } from "./MenuItemsBasic"
import { TEditorView } from "./Schema"

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
    </MenuBar>
  )
}
