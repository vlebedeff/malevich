import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../state";
import { moveFigure, pullUpFigure, pushDownFigure } from "../actions";
import { CanvasFigure, StateProps, DispatchProps } from "../../components/canvas/canvas_figure";

interface CanvasContainerProps { index: number }

const mapStateToProps = (state: CanvasState, ownProps: CanvasContainerProps): StateProps => {
  return {
    figure: state.figures[ownProps.index]
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<CanvasState>,
  ownProps: CanvasContainerProps
): DispatchProps => {

  return {
    onMove: (x: number, y: number): void => {
      dispatch(
        moveFigure(ownProps.index, x, y)
      );
    },

    onDoubleClick: (): void => {
      dispatch(
        pullUpFigure(ownProps.index)
      );
    },

    onAltDoubleClick: (): void => {
      dispatch(
        pushDownFigure(ownProps.index)
      );
    }
  };
}

export const CanvasFigureContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasFigure);
