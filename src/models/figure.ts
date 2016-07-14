export interface FigureData {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  shape: string
}

export class Figure implements FigureData {

  static defaultSize: number = 128;

  constructor(private data: FigureData) {
    this.data.shape = data.shape;
    this.data.x = data.x || 0;
    this.data.y = data.y || 0;
    this.data.width = data.width || Figure.defaultSize;
    this.data.height = data.height || Figure.defaultSize;
  }

  get x(): number { return this.data.x }

  get y(): number { return this.data.y }

  get width(): number { return this.data.width }

  get height(): number { return this.data.height }

  get shape(): string { return this.data.shape }
}
