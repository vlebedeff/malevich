import { Figure } from "../models/figure";

export interface CanvasState {
  figures: Figure[],
  selectedFigures: number[]
}
