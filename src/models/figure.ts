export interface FigureData {
  x: number,
  y: number,
  width: number,
  height: number,
  shape: string
}

export class Figure implements FigureData {

  constructor(private data: FigureData) {}

  get x(): number { return this.data.x }

  get y(): number { return this.data.y }

  get width(): number { return this.data.width }

  get height(): number { return this.data.height }

  get shape(): string { return this.data.shape }
}
