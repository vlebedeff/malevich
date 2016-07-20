import { Figure, Transform } from "../models";

export interface FigureState {
  list: Array<Figure>,
  selected: Array<number>
}

export interface CanvasState {
  figures: Undoable<FigureState>,
  transform: Transform
}

export interface Undoable<T> {
  past: Array<T>,
  present: T,
  future: Array<T>
}
