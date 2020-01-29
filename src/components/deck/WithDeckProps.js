import usePokerGameModel from "models/usePokerGameModel";

import React from "react";

const WithDeckProps = Component => {
  const {
    option,
    foldAction,
    callAction,
    raiseAction,
    betAmount,
    setAmount,
    appendOneCard,
    cards,
    submitted,
    setFoldSubmitted
    // started,
    // startGame,
    // notStartGame
  } = usePokerGameModel();

  return (
    <Component
      option={option}
      foldAction={foldAction}
      callAction={callAction}
      raiseAction={raiseAction}
      betAmount={betAmount}
      setAmount={setAmount}
      appendOneCard={appendOneCard}
      cards={cards}
      submitted={submitted}
      setFoldSubmitted={setFoldSubmitted}
      // started={started}
      // startGame={startGame}
      // notStartGame={notStartGame}
    />
  );
};

export default WithDeckProps;
