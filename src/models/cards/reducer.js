import { APPEND_ONE_CARD } from "./actions";
import { getCards, appendOneCard } from "libraries/game";
import { RandomCards } from "libraries/cardsRating";

const [myHand, initCards] = getCards(RandomCards, 3);
const [opponentHand, restCards] = getCards(initCards, 3);

const initialState = {
  cards: restCards,
  myHand: myHand,
  opponentHand: opponentHand
};

const reducer = (state = initialState, action) => {
  var myHand, opponentHand, inCards, restCards;
  switch (action.type) {
    case APPEND_ONE_CARD:
      [myHand, inCards] = appendOneCard(state.myHand, state.cards);
      [opponentHand, restCards] = appendOneCard(state.opponentHand, inCards);
      return {
        cards: restCards,
        myHand: myHand,
        opponentHand: opponentHand
      };
    default:
      return state;
  }
};

export default reducer;
