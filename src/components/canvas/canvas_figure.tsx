import * as React from "react";
import { Figure } from "../../models/figure";

class CanvasFigureProps { figure: Figure }

export class CanvasFigure extends React.Component<CanvasFigureProps, {}> {

  public render(): JSX.Element {
    const { figure } = this.props;

    return (
      <use xlinkHref={`figures/${figure.shape}.svg#${figure.shape}`} className="mv-canvas--figure"
           x={figure.x} y={figure.y} width={figure.width} height={figure.height} />
    );
  }
}
