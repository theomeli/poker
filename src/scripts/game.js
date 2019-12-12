import { deepFreeze } from "./cardsRating";

const getCards = (cards, n) => {
  var handCards = cards.slice(0, 3);
  handCards = deepFreeze(
    handCards.map(c => {
      return { rank: c.rank, suit: c.suit };
    })
  );
  const restOfTheCards = cards.slice(3);
  return [handCards, restOfTheCards];
};

const appendOneCard = (cards, allCards) => {
  const aCard = allCards.slice(0, 1);
  aCard.map(c => {
    return { rank: c.rank, suit: c.suit };
  });

  const clonedCards = cards.map(a => ({ ...a }));
  clonedCards.push(aCard[0]);

  const restOfTheCards = allCards.slice(1);

  return [clonedCards, restOfTheCards];
};

export { appendOneCard, getCards };
