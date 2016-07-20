import { connect } from "react-redux";
import { CanvasState, Undoable } from "../../redux/state";
import { Selection, SelectionProps } from "../../components/canvas/selection";

const mapStateToProps = (
  state: CanvasState, ownProps: { onMouseDown: (e: MouseEvent) => void }
): SelectionProps => {
  let selectedFigures = state.figures.present.list.filter(
    figure => state.figures.present.selected.indexOf(figure.id) != -1
  )
  if (selectedFigures.length == 0) {
    return { x: 0, y: 0, width: 0, height: 0, onMouseDown: ownProps.onMouseDown };
  } else {
    let x = Infinity;
    let y = Infinity;
    let bottomRightX = 0;
    let bottomRightY = 0;
    for (let figure of selectedFigures) {
      x = Math.min(x, figure.x);
      y = Math.min(y, figure.y);
      bottomRightX = Math.max(bottomRightX, figure.x + figure.width);
      bottomRightY = Math.max(bottomRightY, figure.y + figure.height);
    }
    const padding = 1;
    const { deltaX, deltaY } = state.transform;
    return {
      x: x + deltaX - padding,
      y: y + deltaY - padding,
      width: bottomRightX - x + padding * 2,
      height: bottomRightY - y + padding * 2,
      onMouseDown: ownProps.onMouseDown
    }
  }
}

export default connect(mapStateToProps, null)(Selection);
