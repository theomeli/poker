import { useSelector, useDispatch } from "react-redux";
import { foldIsSubmitted } from "./actions";

const useFoldSubmittedModel = () => {
  const submitted = useSelector({ submitted });
  const dispatch = useDispatch();
  const setFoldSubmitted = () => dispatch(foldIsSubmitted());

  return {
    ...submitted,
    setFoldSubmitted
  };
};

export default useFoldSubmittedModel;
