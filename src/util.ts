import { MarkType } from "prosemirror-model"
import { EditorState } from "prosemirror-state"

export const isMarkActive = (type: MarkType) => (state: EditorState): boolean => {
  const { from, $from, to, empty } = state.selection
  return empty ? Boolean(type.isInSet(state.storedMarks || $from.marks())) : state.doc.rangeHasMark(from, to, type)
}
