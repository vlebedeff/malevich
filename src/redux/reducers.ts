import { Action, Reducer } from "redux";
import { CanvasState } from "./state";
import { Figure } from "../models/figure";
import * as Actions from "./actions";

function figures(canvasState: CanvasState): Reducer<Array<Figure>> {

  return (state: Figure[], action: Action) => {
    switch(action.type) {
      case Actions.ADD_FIGURE:
        let newFigure = (<Actions.AddFigureAction>action).figure;
        return [ ...state, newFigure]

      case Actions.REMOVE_FIGURE:
        let removedId = (<Actions.RemoveFigureAction>action).id;
        return state.filter(figure => figure.id != removedId)

      case Actions.MOVE_FIGURES:
        let { deltaX, deltaY } = (<Actions.MoveFiguresAction>action);
        return state.map((figure) => {
            if (canvasState.selectedFigures.indexOf(figure.id) != -1) {
              return new Figure({
                id: figure.id,
                shape: figure.shape,
                x: figure.x + deltaX,
                y: figure.y + deltaY
              })
            } else {
              return figure;
            }
          })

      case Actions.BRING_TO_FRONT:
        return [
          ...state.filter(figure => canvasState.selectedFigures.indexOf(figure.id) == -1),
          ...state.filter(figure => canvasState.selectedFigures.indexOf(figure.id) != -1)
        ]

      case Actions.BRING_TO_BOTTOM:
        return [
          ...state.filter(figure => canvasState.selectedFigures.indexOf(figure.id) != -1),
          ...state.filter(figure => canvasState.selectedFigures.indexOf(figure.id) == -1)
        ]

      default:
        return state
    }
  }
}

function selectedFigures(state: number[], action: Action): number[] {
    switch(action.type) {
      case Actions.ADD_FIGURE:
        let newFigure = (<Actions.AddFigureAction>action).figure;
        return [newFigure.id]

      case Actions.SELECT_FIGURE:
        let { id, exclusive } = (<Actions.SelectFigureAction>action);
        return exclusive ? [id] : [ ...state, id ]

      case Actions.REMOVE_FIGURE:
        let removedId = (<Actions.RemoveFigureAction>action).id;
        return state.filter(id => id != removedId)

      case Actions.DESELECT_ALL:
        return new Array<number>();

      default:
        return state;
    }
}

const initialState = {
  figures: new Array<Figure>(),
  selectedFigures: new Array<number>()
}
export function canvas(state: CanvasState = initialState, action: Action): CanvasState {
  return {
    figures: figures(state)(state.figures, action),
    selectedFigures: selectedFigures(state.selectedFigures, action)
  }
}
