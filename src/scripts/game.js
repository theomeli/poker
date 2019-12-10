import {
  deepFreeze,
  // RandomCards,
  RankMapping
  // SuitMapping
} from "./cardsRating";

const getCards = (cards, n) => {
  var handCards = cards.slice(0, 3);
  handCards = deepFreeze(
    handCards.map(c => {
      return { rank: RankMapping[c.rank], suit: c.suit };
    })
  );
  const restOfTheCards = cards.slice(3);
  return [handCards, restOfTheCards];
};

const appendOneCard = (cards, allCards) => {
  const aCard = allCards.slice(0, 1);
  aCard.map(c => {
    return { rank: RankMapping[c.rank], suit: c.suit };
  });

  const clonedCards = cards.map(a => ({ ...a }));
  clonedCards.push(aCard[0]);

  const restOfTheCards = allCards.slice(1);

  console.log("clonedCards");
  console.log(clonedCards);
  console.log("restOfTheCards");
  console.log(restOfTheCards);

  return [clonedCards, restOfTheCards];
};

// var [myHand, cards] = getCards(RandomCards, 3);
// var [opponentHand, cards] = getCards(cards, 3);

export { appendOneCard, getCards };
