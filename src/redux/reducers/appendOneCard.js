import { START_GAME, APPEND_ONE_CARD } from "../actions/actions";
import { getCards } from "../../scripts/game";
import { RandomCards } from "../../scripts/cardsRating";

const [myHand, cards] = getCards(RandomCards, 3);
const [opponentHand, restCards] = getCards(cards, 3);

const initialState = {
  cards: restCards,
  myHand: myHand,
  opponentHand: opponentHand
};

function appendOneCard(state = initialState, action) {
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
    case APPEND_ONE_CARD:
      [myHand, cards] = appendOneCard(state.myHand, state.cards);
      [opponentHand, restCards] = appendOneCard(state.opponentHand, cards);
      return {
        cards: restCards,
        myHand: myHand,
        opponentHand: opponentHand
      };
    default:
      return state;
  }
}

export default appendOneCard;
