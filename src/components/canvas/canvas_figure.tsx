import * as React from "react";
import { Figure } from "../../models/figure";

export interface StateProps { figure: Figure }
export interface DispatchProps {
  onMove: (x: number, y: number) => void
}

interface Point {
  x: number,
  y: number
}

export class CanvasFigure extends React.Component<StateProps & DispatchProps, {}> {

  motionListener: (e: MouseEvent) => void;
  stopListener: (e: MouseEvent) => void;

  capturePoint: Point;

  constructor(props: StateProps & DispatchProps) {
    super(props);

    this.motionListener = (e: MouseEvent) => {
      let deltaX = e.clientX - this.capturePoint.x;
      let deltaY = e.clientY - this.capturePoint.y;

      this.setAttribute("x", +this.getAttribute("x") + deltaX);
      this.setAttribute("y", +this.getAttribute("y") + deltaY);
      this.capturePoint = { x: e.clientX, y: e.clientY };
    }

    this.stopListener = (e: MouseEvent) => {
      this.getParent().removeEventListener('mousemove', this.motionListener);
      this.getParent().removeEventListener('mouseup', this.stopListener);
      if (this.wasMoved()) {
        this.props.onMove(+this.getAttribute("x"), +this.getAttribute("y"));
      }
    }
  }

  refs: {
    [key: string]: (Element),
    figure: HTMLElement
  }

  onMouseDown = (e: MouseEvent) => {
    this.capturePoint = { x: e.clientX, y: e.clientY }
    this.getParent().addEventListener('mousemove', this.motionListener);
    this.getParent().addEventListener('mouseup', this.stopListener);
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

  private getParent = (): Node => {
    return this.refs.figure.parentNode;
  }

  private getAttribute = (key: string): string => {
    return this.refs.figure.getAttribute(key);
  }

  private setAttribute = (key: string, value: any): void => {
    this.refs.figure.setAttribute(key, value.toString());
  }

  private wasMoved = (): boolean => {
    return this.props.figure.x != +this.getAttribute("x") ||
           this.props.figure.y != +this.getAttribute("y")
  }
}
