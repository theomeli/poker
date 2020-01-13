import { useSelector, useDispatch } from "react-redux";
import appendACard from "./actions";

const useCardsModel = () => {
  const cardsState = useSelector(({ cards }) => cards);
  const dispatch = useDispatch();
  const appendOneCard = () => dispatch(appendACard());

  return {
    ...cardsState,
    appendOneCard
  };
};

export default useCardsModel;
