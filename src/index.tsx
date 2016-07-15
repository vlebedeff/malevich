import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { figures } from "./redux/reducers";
import { Editor } from "./components/editor";

ReactDOM.render(
  <Provider store={createStore(figures())}>
    <Editor />
  </Provider>,
  document.getElementById('editor')
);
