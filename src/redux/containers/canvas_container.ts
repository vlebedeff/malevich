import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../state";
import * as Actions from "../actions";

import { Canvas, StateProps, DispatchProps } from "../../components/canvas/canvas";

const mapStateToProps = (state: CanvasState): StateProps => {
  return {
    figures: state.figures
  };
}

const mapDispatchToProps = (dispatch: Dispatch<CanvasState>): DispatchProps => {
  return {
    onDragOver: (e: DragEvent) => {
      e.preventDefault()
    },

    onDrop: (e: DragEvent, clientRect: ClientRect) => {
      e.preventDefault();
      dispatch(
        Actions.addFigure(
          e.dataTransfer.getData("shape"),
          e.clientX - clientRect.left,
          e.clientY - clientRect.top
        )
      );
    },

    onFigureMouseDown: (id: number, shiftKey: boolean) => {
      dispatch(Actions.selectFigure(id, !shiftKey));
    },

    onMove: (deltaX: number, deltaY: number) => {
      dispatch(Actions.moveFigures(deltaX, deltaY));
    },

    onCanvasMouseDown: () => {
      dispatch(Actions.deselectAll());
    },

    onCmdUp: () => {
      dispatch(Actions.bringToFront());
    },

    onCmdDown: () => {
      dispatch(Actions.bringToBottom());
    }
  }
}

export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(Canvas);
