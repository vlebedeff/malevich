import * as React from "react";
import { Store } from "redux";

import { Palette } from "./palette/palette";
import { CanvasContainer } from "../redux/containers/canvas_container";

export class Editor extends React.Component<{}, {}> {

  render() {
    return (
      <div className="mv-editor">
        <Palette />
        <CanvasContainer />
      </div>
    )
  }
}
