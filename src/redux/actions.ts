import { Action } from "redux";
import { Figure } from "../models/figure";

export const ADD_FIGURE = "ADD_FIGURE";
export const REMOVE_FIGURE = "REMOVE_FIGURE";
export const PULL_UP_FIGURE = "PULL_UP_FIGURE";
export const PUSH_DOWN_FIGURE = "PUSH_DOWN_FIGURE";
export const MOVE_FIGURE = "MOVE_FIGURE";

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

export interface RemoveFigureAction extends Action { index: number }
export function removeFigure(index: number): RemoveFigureAction {
  return { index: index, type: REMOVE_FIGURE };
}

export interface PullUpFigureAction extends Action { index: number }
export function pullUpFigure(index: number): PullUpFigureAction {
  return { index: index, type: PULL_UP_FIGURE };
}

export interface PushDownFigureAction extends Action { index: number }
export function pushDownFigure(index: number): PullUpFigureAction {
  return { index: index, type: PUSH_DOWN_FIGURE };
}

export interface MoveFigureAction extends Action { index: number, x: number, y: number }
export function moveFigure(index: number, x: number, y: number): MoveFigureAction {
  return {
    index: index,
    x: x,
    y: y,
    type: MOVE_FIGURE
  };
}
