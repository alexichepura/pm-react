import { nodes as pmBasicNodes } from "prosemirror-schema-basic"
import { orderedList, bulletList, listItem } from "prosemirror-schema-list"

const listNodes = {
  ordered_list: {
    ...orderedList,
    content: "list_item+",
    group: "block"
  },
  bullet_list: {
    ...bulletList,
    content: "list_item+",
    group: "block"
  },
  list_item: {
    ...listItem,
    content: "paragraph block*"
    // content: "paragraph (ordered_list | bullet_list)*"
  }
}

export const nodes = {
  ...pmBasicNodes,
  ...listNodes
}
