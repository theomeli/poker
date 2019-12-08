import { RandomCards } from "../../scripts/cardsRating";
import { getCards, appendOneCard } from "../../scripts/game";
import { START_GAME, ADD_CARD } from "../actions/actions";

const initialState = {
  cards: RandomCards,
  myHand: null,
  opponentHand: null
};

function rootReducer(state = initialState, action) {
  var myHand, opponentHand, cards, restCards;
  switch (action.type) {
    case START_GAME:
      [myHand, cards] = getCards(state.cards, 3);
      [opponentHand, restCards] = getCards(cards, 3);
      return {
        cards: restCards,
        myHand: myHand,
        opponentHand: opponentHand
      };
    case ADD_CARD:
      [myHand, cards] = appendOneCard(state.myHand, state.cards);
      [opponentHand, cards] = appendOneCard(state.opponentHand, cards);
      return {
        cards: restCards,
        myHand: myHand,
        opponentHand: opponentHand
      };
    default:
      return state;
  }
}

export default rootReducer;
