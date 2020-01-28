import setAmount from "./actions";

const initialState = {
  betAmount: "50"
};

const setBetAmount = (state = initialState, action) => {
  switch (action.type) {
    case setAmount.type:
      return { betAmount: action.amount };
    default:
      return state;
  }
};

export default setBetAmount;
