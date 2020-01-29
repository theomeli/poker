import { useGameStartedModel } from "models/game-started";

import React from "react";

const WithPropsApp = Component => {
  console.log("*************************");

  require("react-dom");
  window.React2 = require("react");
  console.log(window.React1 === window.React2);

  const { started, startGame, notStartGame } = useGameStartedModel();

  console.log("####################");
  console.log(started);
  console.log(startGame);

  return (
    <Component
      started={started}
      startGame={startGame}
      notStartGame={notStartGame}
    />
  );
};

export default WithPropsApp;
