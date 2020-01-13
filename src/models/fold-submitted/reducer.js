import { foldSubmitted, foldNotSubmitted } from "./actions";

const initialState = {
  submitted: foldNotSubmitted.type
};

function foldIsSubmitted(state = initialState, action) {
  switch (action.type) {
    case foldSubmitted.type:
      return {
        submitted: foldSubmitted.payload
      };
    case foldNotSubmitted.type:
      return {
        submitted: foldNotSubmitted.payload
      };
    default:
      return state;
  }
}

export default foldIsSubmitted;
