import { marks as pmBasicMarks } from "prosemirror-schema-basic"
import { MarkSpec } from "prosemirror-model"

const subscript: MarkSpec = {
  excludes: "superscript",
  parseDOM: [{ tag: "sub" }, { style: "vertical-align=sub" }],
  toDOM: () => ["sub"]
}

const superscript: MarkSpec = {
  excludes: "subscript",
  parseDOM: [{ tag: "sup" }, { style: "vertical-align=super" }],
  toDOM: () => ["sup"]
}

const strikethrough: MarkSpec = {
  parseDOM: [
    { tag: "strike" },
    { style: "text-decoration:line-through" },
    { style: "text-decoration-line:line-through" }
  ],
  toDOM: () => [
    "span",
    {
      style: "text-decoration-line:line-through"
    }
  ]
}

const underline: MarkSpec = {
  parseDOM: [{ tag: "u" }, { style: "text-decoration:underline" }],
  toDOM: () => [
    "span",
    {
      style: "text-decoration:underline"
    }
  ]
}

export const marks: Record<string, MarkSpec> = {
  ...pmBasicMarks,
  subscript,
  superscript,
  strikethrough,
  underline
}
