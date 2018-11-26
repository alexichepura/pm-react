import * as React from "react"
import { EditorView } from "prosemirror-view"

type TMenuContext = {
  view: EditorView
}

export const MenuContext = React.createContext({} as TMenuContext)

type TMenuBarProps = { view: EditorView } & React.HTMLAttributes<HTMLDivElement>

export class MenuBar extends React.Component<TMenuBarProps> {
  render() {
    if (!this.props.view) {
      return null
    }
    return (
      <MenuContext.Provider value={{ view: this.props.view }}>
        <div {...this.props} />
      </MenuContext.Provider>
    )
  }
}
