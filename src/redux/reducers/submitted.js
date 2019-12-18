import { SUBMITTED, NOT_SUBMITTED } from "../actions/actions";

const initialState = {
  submitted: NOT_SUBMITTED
};

function submitted(state = initialState, action) {
  switch (action.type) {
    case SUBMITTED:
      return {
        submitted: SUBMITTED
      };
    case NOT_SUBMITTED:
      return {
        submitted: NOT_SUBMITTED
      };
    default:
      return state;
  }
}

export default submitted;