import { useSelector, useDispatch } from "react-redux";
import optionAnAction from "./actions";

const useCardsModel = () => {
  const option = useSelector(({ option }) => option);
  const dispatch = useDispatch();
  const optionAction = () => dispatch(optionAnAction());

  return {
    ...option,
    optionAction
  };
};

export default useCardsModel;
