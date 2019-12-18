import { BET_AMOUNT } from "../actions/actions";

const initialState = {
  betAmount: BET_AMOUNT
};

function betAmount(state = initialState, action) {
  switch (action.type) {
    case BET_AMOUNT:
      return { betAmount: action.amount };
    default:
      return state;
  }
}

export default betAmount;
