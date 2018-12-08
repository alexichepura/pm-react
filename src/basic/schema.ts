import { Schema } from "prosemirror-model"
import { EditorView } from "prosemirror-view"
import { marks } from "./marks"
import { nodes } from "./nodes"

export const schema = new Schema({
  nodes,
  marks
})
export type TEditorView = EditorView<typeof schema>
