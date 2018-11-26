import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import { exampleSetup } from "prosemirror-example-setup"
import { DOMParser, Schema } from "prosemirror-model"
import { schema } from "prosemirror-schema-basic"
import { addListNodes } from "prosemirror-schema-list"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import * as React from "react"
import { Content } from "../src/Content"
import { MenuBar } from "../src/MenuBar"
import { Em, Strong } from "../src/MenuItem"

export class Editor extends React.Component<{}> {
  editorNode: HTMLDivElement | null = null
  view: any
  componentDidMount() {
    this.init()
    this.forceUpdate()
  }
  init() {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes as any, "paragraph block*", "block"),
      marks: schema.spec.marks
    })

    const domNode = document.createElement("div")
    domNode.innerHTML = ""

    const editorNode = this.editorNode!
    this.view = new EditorView(editorNode, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(domNode),
        plugins: exampleSetup({ schema: mySchema, menuBar: false, floatingMenu: false })
      })
    })
  }
  render() {
    return (
      <Paper>
        <MenuBar view={this.view}>
          <Strong mark={schema.marks.strong} />
          <Em mark={schema.marks.em} />
        </MenuBar>
        <Divider />
        <Content getNode={node => (this.editorNode = node)} />
      </Paper>
    )
  }
}
