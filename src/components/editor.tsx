import * as React from "react";

import { Palette } from "./palette/palette";
import { Canvas } from "./canvas/canvas";

export class Editor extends React.Component<{}, {}> {

  render() {
    return (
      <div className="mv-editor">
        <Palette />
        <Canvas />
      </div>
    )
  }
}
