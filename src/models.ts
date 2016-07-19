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

export interface Transform {
  deltaX: number,
  deltaY: number
}

export class TransformedFigure implements FigureData {

  constructor(private figure: Figure, private transform: Transform) {
    this.figure = figure;
    this.transform = transform;
  }

  get id() { return this.figure.id }

  get shape() { return this.figure.shape }

  get x() { return this.figure.x + this.transform.deltaX }

  get y() { return this.figure.y + this.transform.deltaY }

  get width() { return this.figure.width }

  get height() { return this.figure.height }
}
