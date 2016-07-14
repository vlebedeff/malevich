import { Action, Reducer } from "redux";
import { CanvasState } from "./state";
import { Figure } from "../models/figure";
import * as Actions from "./actions";

export function figures(): Reducer<CanvasState> {
  const initialState = {
    figures: new Array<Figure>()
  };

  const figuresExcept = (figures: Figure[], index: number): Figure[] => {
    return figures.slice(0, index).concat(figures.slice(index + 1));
  };

  return (state: CanvasState = initialState, action: Action) => {
    switch(action.type) {
      case Actions.ADD_FIGURE:
        return {
          figures: [ ...state.figures, (action as Actions.AddFigureAction).figure ]
        }

      case Actions.REMOVE_FIGURE:
        var index = (action as Actions.RemoveFigureAction).index;
        var figures = state.figures;
        return { figures: figuresExcept(figures, index) }

      case Actions.PULL_UP_FIGURE:
        var index = (action as Actions.PullUpFigureAction).index;
        var figures = state.figures;
        return { figures: [ ...figuresExcept(figures, index), figures[index] ] }

      case Actions.PUSH_DOWN_FIGURE:
        var index = (action as Actions.PushDownFigureAction).index;
        var figures = state.figures;
        return { figures: [ figures[index], ...figuresExcept(figures, index) ] }

      case Actions.MOVE_FIGURE:
        var { index, x, y } = (action as Actions.MoveFigureAction);
        return {
          figures: [
            ...state.figures.slice(0, index),
            new Figure({ shape: state.figures[index].shape, x: x, y: y}),
            ...state.figures.slice(index + 1)
          ]
        }

      default:
        return state;
    }
  }
}
