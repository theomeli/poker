import { BET_AMOUNT } from "./actions";

const initialState = {
  betAmount: "50"
};

const setBetAmount = (state = initialState, action) => {
  switch (action.type) {
    case BET_AMOUNT:
      return { betAmount: action.amount };
    default:
      return state;
  }
};

export default setBetAmount;
