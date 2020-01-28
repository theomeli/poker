import { useSelector, useDispatch } from "react-redux";
// import optionAnAction from "./actions";
import { fold, call, raise } from "./actions";

const useCardsModel = () => {
  const option = useSelector(({ option }) => option);
  const dispatch = useDispatch();
  const foldAction = () => dispatch(fold());
  const callAction = () => dispatch(call());
  const raiseAction = () => dispatch(raise());

  return {
    ...option,
    foldAction,
    callAction,
    raiseAction
  };
};

export default useCardsModel;
