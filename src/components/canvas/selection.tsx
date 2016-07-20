import * as React from "react";
import { connect } from "react-redux";
import { CanvasState, Undoable } from "../../redux/state";

export interface SelectionProps {
  x: number,
  y: number,
  width: number,
  height: number,
  onMouseDown: (e: MouseEvent) => void
}

export class Selection extends React.Component<SelectionProps, {}> {

  public render(): JSX.Element {
    return (
      <rect
        className="mv-canvas--selection"
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.props.onMouseDown}/>
    )
  }
}
