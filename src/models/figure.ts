export interface FigureData {
  id?: number,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  shape: string
}

export class Figure implements FigureData {

  static defaultSize: number = 128;

  constructor(private data: FigureData) {
    this.data = {
      id: data.id || new Date().getTime(),
      shape: data.shape,
      x: data.x || 0,
      y: data.y || 0,
      width: data.width || Figure.defaultSize,
      height: data.height || Figure.defaultSize
    }
  }

  get id(): number { return this.data.id }

  get x(): number { return this.data.x }

  get y(): number { return this.data.y }

  get width(): number { return this.data.width }

  get height(): number { return this.data.height }

  get shape(): string { return this.data.shape }
}
