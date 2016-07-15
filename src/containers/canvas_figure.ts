import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../redux/state";
import { moveFigure } from "../redux/actions";
import { CanvasFigure, StateProps, DispatchProps } from "../components/canvas/canvas_figure";

interface CanvasContainerProps { figureId: number }

const mapStateToProps = (state: CanvasState, ownProps: CanvasContainerProps): StateProps => {
  return {
    figure: state.figures[ownProps.figureId]
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<CanvasState>,
  ownProps: CanvasContainerProps
): DispatchProps => {

  return {
    onMove: (x: number, y: number): void => {
      dispatch(
        moveFigure(ownProps.figureId, x, y)
      );
    }
  };
}

const container = connect(mapStateToProps, mapDispatchToProps)(CanvasFigure);

export { container as CanvasFigure };
