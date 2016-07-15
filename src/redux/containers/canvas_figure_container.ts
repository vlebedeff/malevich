import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../state";
import { moveFigure } from "../actions";
import { CanvasFigure, StateProps, DispatchProps } from "../../components/canvas/canvas_figure";

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

export const CanvasFigureContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasFigure);
