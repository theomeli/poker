// import { START_GAME, APPEND_ONE_CARD } from "../actions/actions";
import { APPEND_ONE_CARD } from "../actions/actions";
import { getCards, appendOneCard } from "../../scripts/game";
import { RandomCards } from "../../scripts/cardsRating";

const [myHand, initCards] = getCards(RandomCards, 3);
const [opponentHand, restCards] = getCards(initCards, 3);

const initialState = {
  cards: restCards,
  myHand: myHand,
  opponentHand: opponentHand
};

function cards(state = initialState, action) {
  var myHand, opponentHand, inCards, restCards;
  switch (action.type) {
    // case START_GAME:
    //   [myHand, cards] = getCards(state.cards, 3);
    //   [opponentHand, restCards] = getCards(cards, 3);
    //   return {
    //     cards: restCards,
    //     myHand: myHand,
    //     opponentHand: opponentHand
    //   };
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
}

export default cards;
