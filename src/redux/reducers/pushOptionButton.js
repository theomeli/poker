import { FOLD, CALL, RAISE } from "../actions/actions";

const initialState = {
  option: CALL
};

function option(state = initialState, action) {
  switch (action.type) {
    case FOLD:
      return {
        option: FOLD
      };
    case CALL:
      return {
        option: CALL
      };
    case RAISE:
      return {
        option: RAISE
      };
    default:
      return state;
  }
}

export default option;
