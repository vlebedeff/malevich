import { Figure, Transform } from "../models";

export interface SelectionState {
  figureIds: number[],
  transform: Transform
}

export interface CanvasState {
  figures: Figure[],
  selection: SelectionState
}
