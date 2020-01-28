import { gameStarted, gameNotStarted } from "./actions";

const initialState = {
  started: gameNotStarted.payload
};

const gameIsStarted = (state = initialState, action) => {
  switch (action.type) {
    case gameStarted.type:
      return {
        started: gameStarted.payload
      };
    case gameNotStarted.type:
      return {
        started: gameNotStarted.payload
      };
    default:
      return state;
  }
};

export default gameIsStarted;
