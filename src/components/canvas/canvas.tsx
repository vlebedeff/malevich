import * as React from "react";

import { CanvasFigure } from "./canvas_figure";
import { TransformedFigure, Transform } from "../../models";
import Selection from "./selection";

export interface StateProps {
  figures: TransformedFigure[]
}

export interface DispatchProps {
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent, clientRect: ClientRect) => void,
  onCmdUp: () => void,
  onCmdDown: () => void,
  onFigureMouseDown: (id: number, shiftKey: boolean) => void,
  onMove: (transform: Transform) => void,
  onMoveEnd: () => void,
  onCanvasMouseDown: () => void
}

interface Point { x: number, y: number }

export class Canvas extends React.Component<StateProps & DispatchProps, {}> {

  motionListener: (e: MouseEvent) => void;
  stopListener: (e: MouseEvent) => void;
  capturePoint: Point;

  constructor(props: StateProps & DispatchProps) {
    super(props);

    this.motionListener = (e: MouseEvent) => {
      this.props.onMove({
        deltaX: e.clientX - this.capturePoint.x,
        deltaY: e.clientY - this.capturePoint.y
      });
    }

    this.stopListener = (e: MouseEvent) => {
      window.removeEventListener('mousemove', this.motionListener);
      window.removeEventListener('mouseup', this.stopListener);
      this.props.onMoveEnd();
    }

    window.onkeydown = (e: KeyboardEvent) => {
      if (e.keyCode == 38 && (e.metaKey || e.ctrlKey)) {
        this.props.onCmdUp();
      }
      if (e.keyCode == 40 && (e.metaKey || e.ctrlKey)) {
        this.props.onCmdDown();
      }
    }
  }

  refs: {
    [key: string]: (Element),
    canvas: Element
  }

  onDrop = (e: DragEvent) => {
    this.props.onDrop(e, this.getClientRect());
  }

  onMouseDown = (e: MouseEvent) => {
    if (e.target == this.refs.canvas) {
      this.props.onCanvasMouseDown();
    }
  }

  render() {
    const figures = this.props.figures;

    return (
      <svg ref="canvas"
           className="mv-canvas"
           onDrop={this.onDrop}
           onDragOver={this.props.onDragOver}
           onMouseDown={this.onMouseDown}>
        {figures.map((figure, i) => (
          <CanvasFigure key={figure.id}
                        figure={figure}
                        onMouseDown={this.onFigureMouseDown(figure.id)} />
        ))}
        <Selection onMouseDown={this.selectionOnMouseDown} />
      </svg>
    )
  }

  private getClientRect = (): ClientRect => {
    return this.refs.canvas.getClientRects()[0];
  }

  private startMotion = (e: MouseEvent) => {
    this.capturePoint = { x: e.clientX, y: e.clientY }
    window.addEventListener('mousemove', this.motionListener);
    window.addEventListener('mouseup', this.stopListener);
  }

  private onFigureMouseDown(id: number) {
    return (e: MouseEvent) => {
      this.props.onFigureMouseDown(id, e.shiftKey);
      this.startMotion(e);
    }
  }

  private selectionOnMouseDown = (e: MouseEvent) => {
    this.startMotion(e);
  }
}
