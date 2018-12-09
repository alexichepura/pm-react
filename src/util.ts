import { NodeType } from "prosemirror-model"
import { EditorState, NodeSelection } from "prosemirror-state"
import { ContentNodeWithPos, hasParentNodeOfType } from "prosemirror-utils"

export const isNodeActive = (type: NodeType, attrs = {}) => (state: EditorState): boolean => {
  const { selection } = state
  if (selection instanceof NodeSelection && selection.node) {
    return selection.node.hasMarkup(type, attrs)
  }

  return hasParentNodeOfType(type)(selection)

  // const { $from, to } = selection
  // return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}

export type TContentNodeWithPosArray = (ContentNodeWithPos | undefined)[]
