import pushOptionButton from "./pushOptionButton";
import appendOneCard from "./appendOneCard";
import submitted from "./submitted";

import { combineReducers } from "redux";

const reducers = combineReducers({
  option: pushOptionButton,
  cards: appendOneCard,
  submitted
});

export default reducers;
