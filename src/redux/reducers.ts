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
        let pull_up_action = (<Actions.PullUpFigureAction>action);
        return {
          figures: [
            ...figuresExcept(state.figures, pull_up_action.index),
            state.figures[pull_up_action.index]
          ]
        }

      case Actions.PUSH_DOWN_FIGURE:
        let push_down_action = (<Actions.PushDownFigureAction>action);
        return {
          figures: [
            state.figures[push_down_action.index],
            ...figuresExcept(state.figures, push_down_action.index)
          ]
        }

      case Actions.MOVE_FIGURE:
        let move_action = (<Actions.MoveFigureAction>action);
        return {
          figures: [
            ...state.figures.slice(0, move_action.index),
            new Figure({
              shape: state.figures[move_action.index].shape,
              x: move_action.x,
              y: move_action.y
            }),
            ...state.figures.slice(move_action.index + 1)
          ]
        }

      default:
        return state;
    }
  }
}
