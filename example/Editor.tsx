import * as React from "react"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { Schema, DOMParser } from "prosemirror-model"
import { schema } from "prosemirror-schema-basic"
import { addListNodes } from "prosemirror-schema-list"
// import { exampleSetup } from "prosemirror-example-setup"

// import { MenuBar } from "../src/MenuBar"

export class Editor extends React.Component<{}> {
  editorNode: HTMLDivElement | null = null
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
    new EditorView(editorNode, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(domNode)
        // plugins: exampleSetup({ schema: mySchema })
      })
    })
  }
  render() {
    return <div ref={r => (this.editorNode = r)} style={{ border: "1px solid gray", minHeight: "200px" }} />
  }
}
