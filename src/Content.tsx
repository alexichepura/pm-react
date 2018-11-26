import * as React from "react"
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles"

const jssStyles = () =>
  createStyles({
    root: {
      border: "1px solid gray",
      "& .ProseMirror": {
        minHeight: "200px",
        padding: "4px 8px 4px 14px",
        lineHeight: 1.2,
        outline: "none",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        fontVariantLigatures: "none"
      }
    }
  })
type TContentProps = {
  getNode: (node: HTMLDivElement) => void
} & WithStyles<typeof jssStyles, false>
export class LeanContent extends React.Component<TContentProps> {
  render() {
    return <div ref={r => this.props.getNode(r as HTMLDivElement)} className={this.props.classes.root} />
  }
}

export const Content = withStyles(jssStyles)(LeanContent)
