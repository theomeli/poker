import { FOLD, CALL, RAISE } from "../actions/actions";

function pushOptionButton(option = "2", action) {
  switch (action.type) {
    case FOLD:
      return {
        option: "1"
      };
    case CALL:
      return {
        option: "2"
      };
    case RAISE:
      return {
        option: "3"
      };
    default:
      return option;
  }
}

export default pushOptionButton;
