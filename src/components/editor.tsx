import * as React from "react";
import { Store } from "redux";

import { Palette } from "./palette/palette";
import { Canvas } from "../containers/canvas";

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
