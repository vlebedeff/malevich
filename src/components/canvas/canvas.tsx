import * as React from "react";

import { CanvasFigure } from "../../containers/canvas_figure";
import { Figure } from "../../models/figure";

export interface StateProps { figures: Figure[] }
export interface DispatchProps {
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, clientRect: ClientRect) => void;
}

export class Canvas extends React.Component<StateProps & DispatchProps, {}> {

  refs: {
    [key: string]: (Element),
    canvas: Element
  }

  onDrop = (e: DragEvent) => {
    this.props.onDrop(e, this.getClientRect());
  }

  render() {
    const figures = this.props.figures;

    return (
      <svg ref="canvas"
           className="mv-canvas"
           onDrop={this.onDrop}
           onDragOver={this.props.onDragOver}>
        {figures.map((figure, i) => <CanvasFigure key={i} figureId={i} />)}
      </svg>
    )
  }

  private getClientRect = (): ClientRect => {
    return this.refs.canvas.getClientRects()[0];
  }
}
