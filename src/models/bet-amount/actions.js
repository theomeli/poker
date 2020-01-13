// const BET_AMOUNT = "50";
const BET_AMOUNT = "BET_AMOUNT";

const setAmount = (amount = "50") => ({ type: BET_AMOUNT, amount: amount });

setAmount.type = BET_AMOUNT;

export default setAmount;
