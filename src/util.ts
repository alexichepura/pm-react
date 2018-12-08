import { MarkType, NodeType } from "prosemirror-model"
import { EditorState, NodeSelection } from "prosemirror-state"

export const isMarkActive = (type: MarkType) => (state: EditorState): boolean => {
  const { from, $from, to, empty } = state.selection
  return empty ? Boolean(type.isInSet(state.storedMarks || $from.marks())) : state.doc.rangeHasMark(from, to, type)
}

export const isNodeActive = (type: NodeType, attrs = {}) => (state: EditorState) => {
  const { selection } = state
  if (selection instanceof NodeSelection && selection.node) {
    return selection.node.hasMarkup(type, attrs)
  }

  const { $from, to } = selection
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}
