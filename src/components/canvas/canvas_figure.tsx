import * as React from "react";
import { TransformedFigure } from "../../models";

export interface StateProps {
  figure: TransformedFigure
}
export interface DispatchProps {
  onMouseDown: (e: MouseEvent) => void
}

interface Point {
  x: number,
  y: number
}

export class CanvasFigure extends React.Component<StateProps & DispatchProps, {}> {

  refs: {
    [key: string]: (Element),
    figure: HTMLElement
  }

  onMouseDown = (e: MouseEvent) => {
    this.props.onMouseDown(e);
  }

  public render(): JSX.Element {
    const { figure } = this.props;

    return (
      <use xlinkHref={`figures/${figure.shape}.svg#${figure.shape}`}
           className="mv-canvas--figure"
           x={figure.x}
           y={figure.y}
           width={figure.width}
           height={figure.height}
           ref="figure"
           onMouseDown={this.onMouseDown} />
    );
  }
}
