import option from "./pushOptionButton";
import cards from "./appendOneCard";
import foldIsSubmitted from "./foldIsSubmitted";
import betAmount from "./betAmount";
import gameStarted from "./gameStarted";

import { combineReducers } from "redux";

const reducers = combineReducers({
  option,
  cards,
  foldIsSubmitted,
  betAmount,
  gameStarted
});

export default reducers;
