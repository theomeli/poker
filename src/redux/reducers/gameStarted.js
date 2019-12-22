import { GAME_STARTED, GAME_NOT_STARTED } from "../actions/actions";

const initialState = {
  started: GAME_NOT_STARTED
};

function gameStarted(state = initialState, action) {
  switch (action.type) {
    case GAME_STARTED:
      return {
        started: GAME_STARTED
      };
    case GAME_NOT_STARTED:
      return {
        started: GAME_NOT_STARTED
      };
    default:
      return state;
  }
}

export default gameStarted;
