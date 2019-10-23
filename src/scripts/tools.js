import _ from "lodash";

/**
 *
 * @param {} cardRanks. Sorted by rank cards
 * @returns boolean. Check if it is a straight of 5 or not
 */
function isFiveStraightFunc(cardRanks) {
  const aStraight = [14, 2, 3, 4, 5];
  for (let i = 0; i < aStraight.length; i++) {
    if (!cardRanks.includes(aStraight[i])) {
      return false;
    }
  }
  return true;
}

/**
 * Given that cards is straight of 5
 * @param {} cards
 * @param {} cardRanks
 * @returns {}
 */
function convertAsus(cards, cardRanks) {
  cards
    .filter(c => c.rank === 14)
    .map(c => {
      c.rank = 1;
      return c;
    });
  cards.sort((a, b) => b.rank - a.rank);

  cardRanks.shift();
  cardRanks.push(1);

  return [cards, cardRanks];
}

function isStraightFunc(cards) {
  for (let i = 0; i < cards.length - 1; i++) {
    const cardA = cards[i].rank;
    const cardB = cards[i + 1].rank;

    if (cardA - cardB > 1 || cardA - cardB === 0) {
      return false;
    }
  }

  return true;
}

function checkSameSuit(cards, cardRanks, isStraight) {
  if (!isStraight) {
    return {
      verbal: `Flush with ${cardRanks.join(", ")}`,
      rating: [6, ...cardRanks]
    };
  }

  if (cards[0].rank === 14) {
    return { verbal: "Royal Flush", rating: [10] };
  } else {
    return {
      verbal: `Straight Flush of ${cardRanks[0]}`,
      rating: [9, cardRanks[0]]
    };
  }
}

function checkFourMax(countEntries, maxCount) {
  if (maxCount === 4) {
    const card = countEntries.filter(c => c[1] === 4)[0][0];

    return {
      verbal: `Four of a Kind of ${card}`,
      rating: [8, Number(card)]
    };
  } else {
    const card = countEntries.filter(c => c[1] === 3)[0][0];

    return {
      verbal: `Full House of ${card}`,
      rating: [7, Number(card)]
    };
  }
}

function checkThreeMax(countEntries, maxCount) {
  if (maxCount === 3) {
    const card = countEntries.filter(c => c[1] === 3)[0][0];

    return {
      verbal: `Three of a Kind of ${card}`,
      rating: [4, Number(card)]
    };
  } else {
    let cards = countEntries
      .filter(c => c[1] === 2)
      .sort((a, b) => b[0] - a[0])
      .map(c => Number(c[0]));
    cards.push(Number(countEntries.filter(c => c[1] === 1)[0][0]));

    return {
      verbal: `Two Pairs of ${cards[0]} and ${cards[1]} with ${cards[2]}`,
      rating: [3, ...cards]
    };
  }
}

function getFourRanks(countEntries) {
  const card = countEntries.filter(c => c[1] === 2)[0][0];
  const cards = countEntries
    .filter(c => c[1] === 1)
    .sort((a, b) => b[0] - a[0])
    .map(c => Number(c[0]));

  return {
    verbal: `One Pair of ${card} with ${cards.join(", ")}`,
    rating: [2, Number(card), ...cards]
  };
}

/**
 *  Given five cards get rating, with verbal and numerical description
 * @param [] cards with properties rank and suit, (Asus is described by 14)
 * @returns {} with a verbal cards description and an array with int describing rating
 */
function getRating(cards) {
  cards.sort((a, b) => b.rank - a.rank);

  let cardRanks = cards.map(c => c.rank);

  const isFiveStraight = isFiveStraightFunc(cardRanks);

  // Check the case of straight flush of 5
  if (isFiveStraight) {
    [cards, cardRanks] = convertAsus(cards, cardRanks);
  }

  // Check for straight
  const isStraight = isStraightFunc(cards);

  // Check cards according to their suit
  if (new Set(cards.map(c => c.suit)).size === 1) {
    return checkSameSuit(cards, cardRanks, isStraight);
  }

  if (isStraight) {
    return {
      verbal: `Straight of ${cardRanks[0]}`,
      rating: [5, cardRanks[0]]
    };
  }

  // create an object with a counter per rank
  const cardsCount = cards.reduce((counters, item) => {
    const rank = item.rank;
    counters[rank] = counters.hasOwnProperty(rank) ? counters[rank] + 1 : 1;
    return counters;
  }, {});
  const ranksCount = Object.values(cardsCount);

  const maxCount = Math.max(...ranksCount);

  const countEntries = Object.entries(cardsCount);

  switch (ranksCount.length) {
    case 2: {
      return checkFourMax(countEntries, maxCount);
    }
    case 3: {
      return checkThreeMax(countEntries, maxCount);
    }
    case 4: {
      return getFourRanks(countEntries);
    }
    default: {
      return {
        verbal: `Nothing with ${cardRanks.join(", ")}`,
        rating: cardRanks
      };
    }
  }
}

const deepFreeze = object => {
  if (typeof object !== "object") {
    return object;
  }

  Object.freeze(object);

  Object.values(object).forEach(v => {
    Object.freeze(v);
  });

  return object;
};

// TODO: see if is deepFreeze
const Suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

const Ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// TODO: see if is deepFreeze
const Cards = Ranks.reduce((accum, rank) => {
  return [...accum, ...Suits.map(suit => ({ rank, suit }))];
}, []);

const RandomCards = deepFreeze(Cards.sort(() => 0.5 - Math.random()));

const maxInOrder = weights =>
  _.chain(weights)
    .sortBy("rank")
    .uniq()
    .map((num, i) => num - i)
    .groupBy()
    .orderBy("length")
    .last()
    .value().length;

class RateableCards {
  constructor(cards) {
    this.ranks = _.groupBy(cards, "rank");
    this.suits = _.groupBy(cards, "suit");
    this.rankTimes = _.groupBy(this.ranks, "length");
    this.suitTimes = _.groupBy(this.suits, "length");
    this.maxInOrder = maxInOrder(cards.map(({ rank }) => rank));
  }
}

export {
  RandomCards,
  getRating,
  isFiveStraightFunc,
  convertAsus,
  isStraightFunc,
  checkSameSuit,
  checkFourMax,
  checkThreeMax,
  getFourRanks,
  deepFreeze,
  Cards,
  maxInOrder,
  RateableCards
};
