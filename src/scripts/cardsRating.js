import _ from "lodash";

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

const Suits = Object.freeze(["Spades", "Hearts", "Diamonds", "Clubs"]);

const SuitMapping = Object.freeze({
  Spades: "S",
  Hearts: "H",
  Diamonds: "D",
  Clubs: "C"
});

const Ranks = Object.freeze([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

const RankMapping = Object.freeze({
  2: 2,
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
  14: "A"
});

const Cards = Ranks.reduce((accum, rank) => {
  return [...accum, ...Suits.map(suit => ({ rank, suit }))];
}, []);

const RandomCards = deepFreeze(Cards.sort(() => 0.5 - Math.random()));

const maxInOrder = weights =>
  _.chain(weights)
    .sortBy()
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
  hasAnAce() {
    return !!this.ranks[14];
  }
  hasInARow(n) {
    return this.maxInOrder == n;
  }
  getNSameRanks(n) {
    return this.rankTimes[n] || [];
  }
  hasNSameRanks(n) {
    return this.getNSameRanks(n).length;
  }
  hasNSameSuits(n) {
    return (this.suitTimes[n] || []).length;
  }
  hasMaxInOrder(n) {
    return this.maxInOrder == n;
  }
  getWorstSingleRank() {
    return _.chain(this.getNSameRanks(1))
      .flatten()
      .sortBy("rank")
      .first()
      .value().rank;
  }
}

const PokerRating = {
  RoyalFlush: hand =>
    hand.hasAnAce() && !!hand.hasMaxInOrder(5) && !!hand.hasNSameSuits(5),
  StraightFlush: hand =>
    !!hand.hasNSameSuits(5) &&
    (!!hand.hasMaxInOrder(5) ||
      (hand.hasAnAce() &&
        hand.hasMaxInOrder(4) &&
        hand.getWorstSingleRank() == 2)),
  FourOfAKind: hand => !!hand.hasNSameRanks(4),
  FullHouse: hand => !!hand.hasNSameRanks(3) && !!hand.hasNSameRanks(2),
  Flush: hand => !!hand.hasNSameSuits(5),
  Straight: hand =>
    !!hand.hasMaxInOrder(5) ||
    (hand.hasAnAce &&
      !!hand.hasMaxInOrder(4) &&
      hand.getWorstSingleRank() == 2),
  ThreeOfAKind: hand => !!hand.hasNSameRanks(3),
  TwoPairs: hand => hand.hasNSameRanks(2) == 2,
  OnePair: hand => !!hand.hasNSameRanks(2),
  HighCard: hand => hand.hasNSameRanks(1) == 5
};

const PokerHandRate = hand =>
  Object.entries(PokerRating).find(([, is]) => is(hand))[0];

export {
  RandomCards,
  deepFreeze,
  Suits,
  SuitMapping,
  Ranks,
  RankMapping,
  Cards,
  maxInOrder,
  RateableCards,
  PokerRating,
  PokerHandRate
};
