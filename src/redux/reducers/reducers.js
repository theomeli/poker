import option from "./pushOptionButton";
import cards from "./appendOneCard";
import submitted from "./submitted";
import betAmount from "./betAmount";

import { combineReducers } from "redux";

const reducers = combineReducers({ option, cards, submitted, betAmount });

export default reducers;
