import { useSelector, useDispatch } from "react-redux";
import setAmount from "./actions";

const useCardsModel = () => {
  const betAmount = useSelector(({ betAmount }) => betAmount);
  const dispatch = useDispatch();
  const setBetAmount = () => dispatch(setAmount());

  return {
    ...betAmount,
    setBetAmount
  };
};

export default useCardsModel;
