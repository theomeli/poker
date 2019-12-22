import option from "./pushOptionButton";
import cards from "./appendOneCard";
import optionSubmitted from "./optionSubmitted";
import betAmount from "./betAmount";
import gameStarted from "./gameStarted";

import { combineReducers } from "redux";

const reducers = combineReducers({
  option,
  cards,
  optionSubmitted,
  betAmount,
  gameStarted
});

export default reducers;
