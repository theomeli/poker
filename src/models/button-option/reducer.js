import { fold, call, raise } from "./actions";

const initialState = {
  option: "2"
};

// TODO: refactor switch
function option(state = initialState, action) {
  switch (action.type) {
    case fold.type:
      return {
        option: action.payload
      };
    case call.type:
      return {
        option: action.payload
      };
    case raise.type:
      return {
        option: action.payload
      };
    default:
      return state;
  }
}

export default option;
