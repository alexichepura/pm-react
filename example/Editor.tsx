import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import { DOMParser, Node as ProsemirrorNode } from "prosemirror-model"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import * as React from "react"
import { Content } from "../src/Content"
import { MenuBasic } from "../src/MenuBasic"
import { schema, TEditorView } from "../src/Schema"

type TEditorProps = {
  onChange?: (doc: ProsemirrorNode) => void
}

export class Editor extends React.Component<TEditorProps> {
  editorNode: HTMLDivElement | null = null
  view: TEditorView | null = null
  componentDidMount() {
    this.init()
    this.forceUpdate()
  }
  init() {
    const domNode = document.createElement("div")
    domNode.innerHTML = ""

    const editorNode = this.editorNode!
    this.view = new EditorView(editorNode, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(domNode)
      }),
      dispatchTransaction: transaction => {
        const view = this.view!
        const { state, transactions } = view.state.applyTransaction(transaction)
        view.updateState(state)
        if (this.props.onChange) {
          if (transactions.some(tr => tr.docChanged)) {
            this.props.onChange(state.doc)
          }
        }

        this.forceUpdate()
      }
      // attributes: this.props.attributes
    })
  }
  render() {
    return (
      <Paper>
        <MenuBasic view={this.view} />
        <Divider />
        <Content getNode={node => (this.editorNode = node)} />
      </Paper>
    )
  }
}
