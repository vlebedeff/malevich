import { Action, Reducer } from "redux";
import { CanvasState } from "./state";
import { Figure } from "../models/figure";
import * as Actions from "./actions";

export function figures(): Reducer<CanvasState> {
  const initialState = {
    figures: new Array<Figure>(),
    selectedFigures: new Array<number>()
  };

  return (state: CanvasState = initialState, action: Action) => {
    switch(action.type) {
      case Actions.ADD_FIGURE:
        let newFigure = (<Actions.AddFigureAction>action).figure;
        return {
          figures: [ ...state.figures, newFigure],
          selectedFigures: [newFigure.id]
        }

      case Actions.REMOVE_FIGURE:
        let removedId = (<Actions.RemoveFigureAction>action).id;
        return {
          figures: state.figures.filter(figure => figure.id != removedId),
          selectedFigures: state.selectedFigures.filter(id => id != removedId)
        }

      case Actions.SELECT_FIGURE:
        let { id, exclusive } = (<Actions.SelectFigureAction>action);
        return {
          figures: state.figures,
          selectedFigures: exclusive ? [id] : [ ...state.selectedFigures, id ]
        }

      case Actions.MOVE_FIGURES:
        let { deltaX, deltaY } = (<Actions.MoveFiguresAction>action);
        return {
          figures: state.figures.map((figure) => {
            if (state.selectedFigures.indexOf(figure.id) != -1) {
              return new Figure({
                id: figure.id,
                shape: figure.shape,
                x: figure.x + deltaX,
                y: figure.y + deltaY
              })
            } else {
              return figure;
            }
          }),
          selectedFigures: state.selectedFigures
        }

      case Actions.DESELECT_ALL:
        return {
          figures: state.figures,
          selectedFigures: new Array<number>()
        } 

      case Actions.BRING_TO_FRONT:
        return {
          figures: [
            ...state.figures.filter(figure => state.selectedFigures.indexOf(figure.id) == -1),
            ...state.figures.filter(figure => state.selectedFigures.indexOf(figure.id) != -1)
          ],
          selectedFigures: state.selectedFigures
        }

      case Actions.BRING_TO_BOTTOM:
        return {
          figures: [
            ...state.figures.filter(figure => state.selectedFigures.indexOf(figure.id) != -1),
            ...state.figures.filter(figure => state.selectedFigures.indexOf(figure.id) == -1)
          ],
          selectedFigures: state.selectedFigures
        }

      default:
        return state;
    }
  }
}
