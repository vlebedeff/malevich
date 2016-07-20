import { Action, Reducer } from "redux";
import { CanvasState, FigureState, Undoable } from "./state";
import { Figure, Transform } from "../models";
import * as Actions from "./actions";

function figures(canvasState: CanvasState): Reducer<FigureState> {

  return (
    state: FigureState = { list: new Array<Figure>(), selected: new Array<number>() },
    action: Action
  ): FigureState => {

    switch(action.type) {
      case Actions.ADD_FIGURE:
        let newFigure = (<Actions.AddFigureAction>action).figure;
        return {
          list: [...state.list, newFigure],
          selected: [newFigure.id]
        }

      case Actions.REMOVE_FIGURE:
        let removedId = (<Actions.RemoveFigureAction>action).id;
        return {
          list: state.list.filter(figure => figure.id != removedId),
          selected: state.selected.filter(id => id != removedId)
        }

      case Actions.APPLY_TRANSFORMATION:
        let { deltaX, deltaY } = canvasState.transform;
        return {
          list: state.list.map((figure) => {
            if (state.selected.indexOf(figure.id) != -1) {
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
          selected: state.selected
        }

      case Actions.BRING_TO_FRONT:
        return {
          list: [
            ...state.list.filter(figure => state.selected.indexOf(figure.id) == -1),
            ...state.list.filter(figure => state.selected.indexOf(figure.id) != -1)
          ],
          selected: state.selected
        }

      case Actions.BRING_TO_BOTTOM:
        return {
          list: [
            ...state.list.filter(figure => state.selected.indexOf(figure.id) != -1),
            ...state.list.filter(figure => state.selected.indexOf(figure.id) == -1)
          ],
          selected: state.selected
        }

      case Actions.SELECT_FIGURE:
        let { id, exclusive } = (<Actions.SelectFigureAction>action);
        return {
          list: state.list,
          selected: exclusive ? [id] : [ ...state.selected, id ]
        }

      case Actions.DESELECT_ALL:
        return {
          list: state.list,
          selected: new Array<number>()
        }

      default:
        return state
    }
  }
}

function transform(state: Transform = { deltaX: 0, deltaY: 0 }, action: Action) {
  switch(action.type) {
    case Actions.TRANSFORM_SELECTION:
      return (<Actions.TransformSelectionAction>action).transform;

    case Actions.APPLY_TRANSFORMATION:
      return { deltaX: 0, deltaY: 0 };

    default:
      return state;
  }
}

export default function canvas(state: CanvasState, action: Action): CanvasState {
  return {
    figures: undoable(figures(state))(state && state.figures, action),
    transform: transform(state && state.transform, action)
  }
}

function undoable<T>(reducer: Reducer<T>): Reducer<Undoable<T>> {

  return (state: Undoable<T>, action: Action): Undoable<T> => {
    switch(action.type) {
      case "@@redux/INIT":
        return {
          past: new Array<T>(),
          present: reducer(undefined, action),
          future: new Array<T>()
        }
      case Actions.SELECT_FIGURE:
      case Actions.TRANSFORM_SELECTION:
      case Actions.DESELECT_ALL:
        return {
          past: state.past,
          present: reducer(state.present, action),
          future: state.future
        }

      case Actions.UNDO:
        if (state.past.length == 0) {
          return state;
        } else {
          return {
            past: [ ...state.past.slice(0, state.past.length - 1) ],
            present: state.past[state.past.length - 1],
            future: [ state.present, ...state.future ]
          }
        }

      case Actions.REDO:
        if (state.future.length == 0) {
          return state;
        } else {
          return {
            past: [ ...state.past, state.present ],
            present: state.future[0],
            future: state.future.slice(1)
          }
        }

      default:
        const newPresent = reducer(state.present, action);

        if (newPresent === state.present) {
          return state;
        } else {
          return {
            past: [ ...state.past, state.present ],
            present: newPresent,
            future: new Array<T>()
          }
        }
    }
  }
}
