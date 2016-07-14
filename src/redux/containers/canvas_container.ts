import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../state";
import { addFigure } from "../actions";

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
        addFigure(
          e.dataTransfer.getData("shape"),
          e.clientX - clientRect.left,
          e.clientY - clientRect.top
        )
      );
    }
  }
}

export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(Canvas);
