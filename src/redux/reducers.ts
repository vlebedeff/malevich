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
          figures: [ ...state.figures, (<Actions.AddFigureAction>action).figure ]
        }

      case Actions.REMOVE_FIGURE:
        return {
          figures: figuresExcept(
            state.figures,
            (<Actions.RemoveFigureAction>action).index
          )
        }

      case Actions.PULL_UP_FIGURE:
        let pullUpAction = (<Actions.PullUpFigureAction>action);
        return {
          figures: [
            ...figuresExcept(state.figures, pullUpAction.index),
            state.figures[pullUpAction.index]
          ]
        }

      case Actions.PUSH_DOWN_FIGURE:
        let pushDownAction = (<Actions.PushDownFigureAction>action);
        return {
          figures: [
            state.figures[pushDownAction.index],
            ...figuresExcept(state.figures, pushDownAction.index)
          ]
        }

      case Actions.MOVE_FIGURE:
        let { index, x, y } = (<Actions.MoveFigureAction>action);
        let { id, shape } = state.figures[index];
        return {
          figures: [
            ...state.figures.slice(0, index),
            new Figure({ id: id, shape: shape, x: x, y: y }),
            ...state.figures.slice(index + 1)
          ]
        }

      default:
        return state;
    }
  }
}
