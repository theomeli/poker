import useGameStartedModel from "models/game-started/useGameStartedModel";

import React from "react";

const WithPropsApp = Component => {
  const { started, startGame, notStartGame } = useGameStartedModel();

  return (
    <Component
      started={started}
      startGame={startGame}
      notStartGame={notStartGame}
    />
  );
};

export default WithPropsApp;
