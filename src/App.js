import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Deck } from "./Deck";

const initialState = { option: "call" };

const reducer = (state, action) => {
  console.log("action");
  console.log(action);

  switch (action.type) {
    case "fold":
      return { option: "fold" };
    case "call":
      return { option: "call" };
    case "raise":
      return { option: "raise" };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <Deck option={state.option} onDispatch={dispatch} />
    </div>
  );
};

export default App;
