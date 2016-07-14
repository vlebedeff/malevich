import * as React from "react";

interface PaletteAssetProps { shape: string }

export class PaletteAsset extends React.Component<PaletteAssetProps, {}> {

  render() {
    return (
      <div className="mv-palette--asset">
        <svg>
          <use xlinkHref={`figures/${this.props.shape}.svg#${this.props.shape}`}
               x="10" y="10" width="80" height="80" />
        </svg>
      </div>
    );
  }
}
