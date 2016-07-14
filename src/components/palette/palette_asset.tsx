import * as React from "react";

interface PaletteAssetProps { shape: string }

export class PaletteAsset extends React.Component<PaletteAssetProps, {}> {

  onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("shape", this.props.shape);
  }

  render() {
    return (
      <div className="mv-palette--asset" draggable="true" onDragStart={this.onDragStart}>
        <svg>
          <use xlinkHref={`figures/${this.props.shape}.svg#${this.props.shape}`}
               x="10" y="10" width="80" height="80" />
        </svg>
      </div>
    );
  }
}
