import * as React from "react"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { Schema, DOMParser } from "prosemirror-model"
import { schema } from "prosemirror-schema-basic"
import { addListNodes } from "prosemirror-schema-list"
import { exampleSetup } from "prosemirror-example-setup"

// import { MenuBar } from "../src/MenuBar"
import { Strong } from "../src/Strong"

export class Editor extends React.Component<{}> {
  editorNode: HTMLDivElement | null = null
  view: any
  componentDidMount() {
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
  getView = () => {
    return this.view
  }
  render() {
    return (
      <div>
        <Strong mark={schema.marks.strong} getView={this.getView} />
        <div ref={r => (this.editorNode = r)} style={{ border: "1px solid gray", minHeight: "200px" }} />
      </div>
    )
  }
}
