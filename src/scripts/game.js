import {
  deepFreeze,
  RandomCards,
  RankMapping,
  SuitMapping
} from "./cardsRating";

const getCards = (cards, n) => {
  var handCards = cards.slice(0, 3);
  handCards = deepFreeze(
    handCards.map(c => {
      // return { rank: RankMapping[c.rank], suit: SuitMapping[c.suit] };
      return { rank: RankMapping[c.rank], suit: c.suit };
    })
  );
  const restOfTheCards = cards.slice(3);
  return [handCards, restOfTheCards];
};

var [myHand, cards] = getCards(RandomCards, 3);
var [opponentHand, cards] = getCards(cards, 3);

export { myHand, opponentHand, cards };
