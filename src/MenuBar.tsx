import * as React from "react"
import { EditorView } from "prosemirror-view"

type TMenuContext = {
  view: EditorView
}

export const MenuContext = React.createContext({} as TMenuContext)

type TMenuBarProps = {
  view: EditorView | null
} & React.HTMLAttributes<HTMLDivElement>

export class MenuBar extends React.Component<TMenuBarProps> {
  render() {
    const { view, ...rest } = this.props
    if (!view) {
      return null
    }
    return (
      <MenuContext.Provider value={{ view }}>
        <div {...rest} />
      </MenuContext.Provider>
    )
  }
}
