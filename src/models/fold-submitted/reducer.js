import { foldIsSubmitted, foldIsNotSubmitted } from "./actions";

const initialState = {
  submitted: foldIsNotSubmitted.type
};

function foldSubmitted(state = initialState, action) {
  switch (action.type) {
    case foldIsSubmitted.type:
      return {
        submitted: foldIsSubmitted.payload
      };
    case foldIsNotSubmitted.type:
      return {
        submitted: foldIsNotSubmitted.payload
      };
    default:
      return state;
  }
}

export default foldSubmitted;
