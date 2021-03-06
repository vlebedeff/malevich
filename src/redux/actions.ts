import { Action } from "redux";
import { Figure, Transform } from "../models";

export const ADD_FIGURE = "ADD_FIGURE";
export const REMOVE_FIGURE = "REMOVE_FIGURE";
export const MOVE_FIGURES = "MOVE_FIGURES";
export const SELECT_FIGURE = "SELECT_FIGURE";
export const DESELECT_ALL = "DESELECT_ALL";
export const BRING_TO_FRONT = "BRING_TO_FRONT";
export const BRING_TO_BOTTOM = "BRING_TO_BOTTOM";
export const TRANSFORM_SELECTION = "TRANSFORM_SELECTION";
export const APPLY_TRANSFORMATION = "APPLY_TRANSFORMATION";
export const UNDO = "UNDO";
export const REDO = "REDO";

export interface AddFigureAction extends Action { figure: Figure }
export function addFigure(shape: string, x: number, y: number): AddFigureAction {
  return {
    figure: new Figure({
      shape: shape,
      x: x - Figure.defaultSize / 2,
      y: y - Figure.defaultSize / 2,
    }),
    type: ADD_FIGURE
  };
}

export interface RemoveFigureAction extends Action { id: number }
export function removeFigure(id: number): RemoveFigureAction {
  return { id: id, type: REMOVE_FIGURE };
}

export interface MoveFiguresAction extends Action { deltaX: number, deltaY: number }
export function moveFigures(deltaX: number, deltaY: number): MoveFiguresAction {
  return {
    deltaX: deltaX,
    deltaY: deltaY,
    type: MOVE_FIGURES
  };
}

export interface SelectFigureAction extends Action { id: number, exclusive: boolean }
export function selectFigure(id: number, exclusive: boolean): SelectFigureAction {
  return {
    id: id,
    exclusive: exclusive,
    type: SELECT_FIGURE
  }
}

export function deselectAll(): Action {
  return { type: DESELECT_ALL }
}

export function bringToFront(): Action {
  return { type: BRING_TO_FRONT };
}

export function bringToBottom(): Action {
  return { type: BRING_TO_BOTTOM };
}

export interface TransformSelectionAction extends Action { transform: Transform }
export function transformSelection(transform: Transform): TransformSelectionAction {
  return {
    transform: transform,
    type: TRANSFORM_SELECTION
  }
}

export function applyTransformation(): Action {
  return { type: APPLY_TRANSFORMATION }
}

export function undo(): Action {
  return { type: UNDO }
}

export function redo(): Action {
  return { type: REDO }
}
