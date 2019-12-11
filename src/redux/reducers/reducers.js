import pushOptionButton from "./pushOptionButton";
import appendOneCard from "./appendOneCard";

import { combineReducers } from "redux";

const reducers = combineReducers({
  option: pushOptionButton,
  cards: appendOneCard
});

export default reducers;

// function rootReducer(state = initialState, action) {
//   var myHand, opponentHand, cards, restCards;
//   switch (action.type) {
//     case START_GAME:
//       [myHand, cards] = getCards(state.cards, 3);
//       [opponentHand, restCards] = getCards(cards, 3);
//       return {
//         cards: restCards,
//         myHand: myHand,
//         opponentHand: opponentHand
//       };
//     case APPEND_ONE_CARD:
//       [myHand, cards] = appendOneCard(state.myHand, state.cards);
//       [opponentHand, restCards] = appendOneCard(state.opponentHand, cards);
//       return {
//         cards: restCards,
//         myHand: myHand,
//         opponentHand: opponentHand
//       };
//     default:
//       return state;
//   }
// }

// export default rootReducer;
