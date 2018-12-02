import { Schema } from "prosemirror-model"
import { addListNodes } from "prosemirror-schema-list"
import { schema as pmSchemaBasic } from "prosemirror-schema-basic"
import { EditorView } from "prosemirror-view"

export const schema = new Schema({
  nodes: addListNodes(pmSchemaBasic.spec.nodes as any, "paragraph block*", "block"),
  marks: pmSchemaBasic.spec.marks
})
export type TEditorView = EditorView<typeof schema>
