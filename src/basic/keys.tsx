import { keymap } from "prosemirror-keymap"
import { undoInputRule } from "prosemirror-inputrules"
import { undo, redo } from "prosemirror-history"
import { wrapInList, splitListItem, liftListItem, sinkListItem } from "prosemirror-schema-list"
// import { goToNextCell } from "prosemirror-tables"
import {
  baseKeymap,
  toggleMark,
  wrapIn,
  setBlockType,
  chainCommands,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode
} from "prosemirror-commands"

import { schema } from "./schema"
import { EditorState, Transaction } from "prosemirror-state"

type TDispatch = (tr: Transaction) => void

const insertBreak = (state: EditorState, dispatch?: TDispatch) => {
  const br = schema.nodes.hard_break.create()
  dispatch && dispatch(state.tr.replaceSelectionWith(br).scrollIntoView())
  return true
}

const insertRule = (state: EditorState, dispatch: TDispatch) => {
  const hr = schema.nodes.horizontal_rule.create()
  dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView())
  return true
}

const keysMap: Record<string, any> = {
  "Mod-z": undo,
  "Shift-Mod-z": redo,
  Backspace: undoInputRule,
  "Mod-y": redo,
  "Alt-ArrowUp": joinUp,
  "Alt-ArrowDown": joinDown,
  "Mod-BracketLeft": lift,
  Escape: selectParentNode,
  "Mod-b": toggleMark(schema.marks.strong),
  "Mod-i": toggleMark(schema.marks.em),
  "Mod-u": toggleMark(schema.marks.underline),
  "Mod-`": toggleMark(schema.marks.code),
  "Shift-Ctrl-8": wrapInList(schema.nodes.bullet_list),
  "Shift-Ctrl-9": wrapInList(schema.nodes.ordered_list),
  "Ctrl->": wrapIn(schema.nodes.blockquote),
  "Mod-Enter": chainCommands(exitCode, insertBreak),
  "Shift-Enter": chainCommands(exitCode, insertBreak),
  "Ctrl-Enter": chainCommands(exitCode, insertBreak), // mac-only?
  Enter: splitListItem(schema.nodes.list_item),
  "Mod-[": liftListItem(schema.nodes.list_item),
  "Mod-]": sinkListItem(schema.nodes.list_item),
  "Shift-Ctrl-0": setBlockType(schema.nodes.paragraph),
  "Shift-Ctrl-\\": setBlockType(schema.nodes.code_block),
  "Shift-Ctrl-1": setBlockType(schema.nodes.heading, { level: 1 }),
  "Shift-Ctrl-2": setBlockType(schema.nodes.heading, { level: 2 }),
  "Shift-Ctrl-3": setBlockType(schema.nodes.heading, { level: 3 }),
  "Shift-Ctrl-4": setBlockType(schema.nodes.heading, { level: 4 }),
  "Shift-Ctrl-5": setBlockType(schema.nodes.heading, { level: 5 }),
  "Shift-Ctrl-6": setBlockType(schema.nodes.heading, { level: 6 }),
  "Mod-_": insertRule
  // Tab: goToNextCell(1),
  // "Shift-Tab": goToNextCell(-1)
}

Object.keys(baseKeymap).forEach(key => {
  if (keysMap[key]) {
    keysMap[key] = chainCommands(keysMap[key], baseKeymap[key])
  } else {
    keysMap[key] = baseKeymap[key]
  }
})

export const keys = keymap(keysMap)
