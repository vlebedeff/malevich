import * as React from "react";
import { connect } from "react-redux";
import { CanvasState } from "../../redux/state";

interface SelectionProps {
  x: number,
  y: number,
  width: number,
  height: number
}
interface ContainerProps {
  onMouseDown: (e: MouseEvent) => void
}

const mapStateToProps = (state: CanvasState, ownProps: ContainerProps): SelectionProps & ContainerProps => {
  if (state.selectedFigures.length == 0) {
    return { x: 0, y: 0, width: 0, height: 0, onMouseDown: ownProps.onMouseDown };
  } else {
    let x = Infinity;
    let y = Infinity;
    let bottomRightX = 0;
    let bottomRightY = 0;
    let selectedFigures = state.figures.filter(figure => state.selectedFigures.indexOf(figure.id) != -1)
    for (let figure of selectedFigures) {
      x = Math.min(x, figure.x);
      y = Math.min(y, figure.y);
      bottomRightX = Math.max(bottomRightX, figure.x + figure.width);
      bottomRightY = Math.max(bottomRightY, figure.y + figure.height);
    }
    const padding = 1;
    return {
      x: x - padding,
      y: y - padding,
      width: bottomRightX - x + padding * 2,
      height: bottomRightY - y + padding * 2,
      onMouseDown: ownProps.onMouseDown
    }
  }
}

class Selection extends React.Component<SelectionProps & ContainerProps, {}> {

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

export default connect(mapStateToProps, null)(Selection);
