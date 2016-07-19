import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CanvasState } from "../state";
import * as Actions from "../actions";
import { TransformedFigure, Transform } from "../../models";

import { Canvas, StateProps, DispatchProps } from "../../components/canvas/canvas";

const mapStateToProps = (state: CanvasState): StateProps => {
  return {
    figures: state.figures.map((figure) => {
      let transform: Transform;
      if (state.selection.figureIds.indexOf(figure.id) == -1) {
        transform = { deltaX: 0, deltaY: 0 };
      } else {
        transform = state.selection.transform;
      }
      return new TransformedFigure(figure, transform);
    })
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

    onMove: (transform: Transform) => {
      dispatch(Actions.transformSelection(transform));
    },

    onMoveEnd: () => {
      dispatch(Actions.applyTransformation());
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
