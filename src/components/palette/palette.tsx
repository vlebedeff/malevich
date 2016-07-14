import * as React from "react";

import { PaletteAsset } from "./palette_asset";

export class Palette extends React.Component<{}, {}> {
  render() {
    const shapes = ["square", "circle", "triangle", "yinyang"];

    return (
      <div className="mv-palette">
        <ul>
          {shapes.map((shape, i) => <li key={i}><PaletteAsset shape={shape} /></li>)}
        </ul>
      </div>
    );
  }
}
