import {
  RandomCards,
  deepFreeze,
  Cards,
  maxInOrder,
  RateableCards,
  PokerRating,
  PokerHandRate
} from "../scripts/tools";

test("Check deepFreeze funtion for a custom object", () => {
  var result = deepFreeze({ prop: 1 });
  const t = () => {
    result.prop = 2;
  };
  expect(t).toThrow(TypeError);
});

test("Check deepFreeze funtion for a custom object 2", () => {
  var result = deepFreeze({ prop: { propB: 2 } });
  const t = () => {
    result.prop.propB = 3;
  };
  expect(t).toThrow(TypeError);
});

test("Check deepFreeze funtion for an array", () => {
  var result = deepFreeze([1, 2, 3]);
  const t = () => {
    result[0] = 2;
  };
  expect(t).toThrow(TypeError);
});

test("Check Cards type", () => {
  var result = typeof Cards;
  expect(result).toEqual("object");
});

test("Check Cards length", () => {
  var result = Cards.length;
  expect(result).toEqual(52);
});

test("Check first Card", () => {
  var result = Cards[0];
  expect(Object.keys(result)).toEqual(["rank", "suit"]);
});

test("Check RandomCards length", () => {
  var result = RandomCards.length;
  expect(result).toEqual(52);
});

test("Check maxInOrder with a hand 1", () => {
  var result = maxInOrder([1, 4, 5, 6, 8]);
  expect(result).toEqual(3);
});

test("Check maxInOrder with a hand 2", () => {
  var result = maxInOrder([6, 4, 3, 4, 8]);
  expect(result).toEqual(2);
});

test("Check maxInOrder with a hand 3", () => {
  var result = maxInOrder([3, 4, 5, 6, 7]);
  expect(result).toEqual(5);
});

test("Check RateableCards constructor", () => {
  const cards = [
    { suit: "clubs", rank: 6 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  const rateableCards = new RateableCards(cards);
  expect(rateableCards.ranks).toEqual({
    6: [{ suit: "clubs", rank: 6 }],
    4: [{ suit: "clubs", rank: 4 }, { suit: "spades", rank: 4 }],
    3: [{ suit: "clubs", rank: 3 }],
    8: [{ suit: "diamonds", rank: 8 }]
  });
  expect(rateableCards.suits).toEqual({
    clubs: [
      { suit: "clubs", rank: 6 },
      { suit: "clubs", rank: 4 },
      { suit: "clubs", rank: 3 }
    ],
    spades: [{ suit: "spades", rank: 4 }],
    diamonds: [{ suit: "diamonds", rank: 8 }]
  });
  expect(rateableCards.rankTimes).toEqual({
    1: [
      [{ suit: "clubs", rank: 3 }],
      [{ suit: "clubs", rank: 6 }],
      [{ suit: "diamonds", rank: 8 }]
    ],
    2: [[{ suit: "clubs", rank: 4 }, { suit: "spades", rank: 4 }]]
  });
  expect(rateableCards.suitTimes).toEqual({
    1: [[{ rank: 4, suit: "spades" }], [{ rank: 8, suit: "diamonds" }]],
    3: [
      [
        { rank: 6, suit: "clubs" },
        { rank: 4, suit: "clubs" },
        { rank: 3, suit: "clubs" }
      ]
    ]
  });
  expect(rateableCards.maxInOrder).toEqual(2);
});

test("Test has an Ace 1", () => {
  const cards = [
    { suit: "clubs", rank: 6 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  const rateableCards = new RateableCards(cards);
  expect(rateableCards.hasAnAce()).toEqual(false);
});

test("Test has an Ace 2", () => {
  const cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  const rateableCards = new RateableCards(cards);
  expect(rateableCards.hasAnAce()).toEqual(true);
});

test("Test hasNSameRanks", () => {
  const cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  const rateableCards = new RateableCards(cards);

  var results = rateableCards.hasNSameRanks(3);
  expect(results).toEqual(0);
  results = rateableCards.hasNSameRanks(2);
  expect(results).toEqual(1);
  results = rateableCards.hasNSameRanks(1);
  expect(results).toEqual(3);
});

test("Test hasNSameRanks", () => {
  const cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  const rateableCards = new RateableCards(cards);

  var results = rateableCards.hasNSameSuits(3);
  expect(results).toEqual(1);
  results = rateableCards.hasNSameSuits(2);
  expect(results).toEqual(0);
  results = rateableCards.hasNSameSuits(1);
  expect(results).toEqual(2);
});

test("Test hasMaxInOrder", () => {
  var cards = [
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 },
    { suit: "spades", rank: 9 }
  ];
  var result = new RateableCards(cards).hasMaxInOrder(5);
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 },
    { suit: "spades", rank: 9 }
  ];
  var result = new RateableCards(cards).hasMaxInOrder(5);
  expect(result).toEqual(false);
});

test("Test getBestSingle", () => {
  var cards = [
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 9 }
  ];
  var result = new RateableCards(cards).getWorstSingleRank();
  expect(result).toEqual(9);

  cards = [
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 9 },
    { suit: "clubs", rank: 9 },
    { suit: "clubs", rank: 9 }
  ];
  result = new RateableCards(cards).getWorstSingleRank();
  expect(result).toEqual(12);
});

test("Test PokerRating", () => {
  const pokerRatingKeys = Object.keys(PokerRating);
  expect(pokerRatingKeys).toEqual([
    "RoyalFlush",
    "StraightFlush",
    "FourOfAKind",
    "FullHouse",
    "Flush",
    "Straight",
    "ThreeOfAKind",
    "TwoPairs",
    "OnePair",
    "HighCard"
  ]);
});

test("Test Royal Flush", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.RoyalFlush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "spades", rank: 10 }
  ];
  var result = PokerRating.RoyalFlush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 9 }
  ];
  result = PokerRating.RoyalFlush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 }
  ];
  result = PokerRating.RoyalFlush(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Straight Flush", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.StraightFlush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 },
    { suit: "spades", rank: 9 }
  ];
  result = PokerRating.StraightFlush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 9 }
  ];
  result = PokerRating.StraightFlush(new RateableCards(cards));
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 2 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 5 }
  ];
  result = PokerRating.StraightFlush(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Four of a Kind", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.FourOfAKind(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "spades", rank: 14 },
    { suit: "diamonds", rank: 14 },
    { suit: "hearts", rank: 14 },
    { suit: "spades", rank: 9 }
  ];
  result = PokerRating.FourOfAKind(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Full House", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 14 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.FullHouse(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "spades", rank: 14 },
    { suit: "diamonds", rank: 14 },
    { suit: "hearts", rank: 13 },
    { suit: "spades", rank: 13 }
  ];
  result = PokerRating.FullHouse(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Flush", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 14 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.Flush(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 6 },
    { suit: "clubs", rank: 8 }
  ];
  result = PokerRating.Flush(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Straight", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 14 },
    { suit: "spades", rank: 4 },
    { suit: "diamonds", rank: 8 }
  ];
  var result = PokerRating.Straight(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "diamonds", rank: 10 }
  ];
  result = PokerRating.Straight(new RateableCards(cards));
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 2 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 4 },
    { suit: "diamonds", rank: 5 }
  ];
  result = PokerRating.Straight(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test Three of a Kind", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 13 },
    { suit: "spades", rank: 14 },
    { suit: "diamonds", rank: 14 }
  ];
  var result = PokerRating.ThreeOfAKind(new RateableCards(cards));
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "diamonds", rank: 10 }
  ];
  result = PokerRating.ThreeOfAKind(new RateableCards(cards));
  expect(result).toEqual(false);
});

test("Test Two Pairs", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 13 },
    { suit: "spades", rank: 13 },
    { suit: "diamonds", rank: 14 }
  ];
  var result = PokerRating.TwoPairs(new RateableCards(cards));
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "diamonds", rank: 10 }
  ];
  result = PokerRating.TwoPairs(new RateableCards(cards));
  expect(result).toEqual(false);
});

test("Test One Pair", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 12 },
    { suit: "spades", rank: 11 },
    { suit: "diamonds", rank: 14 }
  ];
  var result = PokerRating.OnePair(new RateableCards(cards));
  expect(result).toEqual(true);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "diamonds", rank: 10 }
  ];
  result = PokerRating.OnePair(new RateableCards(cards));
  expect(result).toEqual(false);
});

test("Test High Card", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 12 },
    { suit: "spades", rank: 11 },
    { suit: "diamonds", rank: 14 }
  ];
  var result = PokerRating.HighCard(new RateableCards(cards));
  expect(result).toEqual(false);

  cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 9 },
    { suit: "diamonds", rank: 10 }
  ];
  result = PokerRating.HighCard(new RateableCards(cards));
  expect(result).toEqual(true);
});

test("Test PokerHandRate for Royal Flush", () => {
  var cards = [
    { suit: "clubs", rank: 14 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("RoyalFlush");
});

test("Test PokerHandRate for Straight Flush", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "clubs", rank: 13 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 11 },
    { suit: "clubs", rank: 10 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("StraightFlush");
});

test("Test PokerHandRate for Four of a Kind", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "diamonds", rank: 9 },
    { suit: "heards", rank: 9 },
    { suit: "spades", rank: 9 },
    { suit: "clubs", rank: 10 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("FourOfAKind");
});

test("Test PokerHandRate for Full House", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "diamonds", rank: 9 },
    { suit: "heards", rank: 9 },
    { suit: "spades", rank: 10 },
    { suit: "clubs", rank: 10 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("FullHouse");
});

test("Test PokerHandRate for Flush", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "clubs", rank: 8 },
    { suit: "clubs", rank: 6 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("Flush");
});

test("Test PokerHandRate for Straight", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "spades", rank: 8 },
    { suit: "clubs", rank: 12 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("Straight");
});

test("Test PokerHandRate for Three of a Kind", () => {
  var cards = [
    { suit: "clubs", rank: 9 },
    { suit: "spades", rank: 9 },
    { suit: "hearts", rank: 9 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("ThreeOfAKind");
});

test("Test PokerHandRate for Two Pairs", () => {
  var cards = [
    { suit: "diamonds", rank: 10 },
    { suit: "spades", rank: 9 },
    { suit: "hearts", rank: 9 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("TwoPairs");
});

test("Test PokerHandRate for One Pair", () => {
  var cards = [
    { suit: "diamonds", rank: 10 },
    { suit: "spades", rank: 12 },
    { suit: "hearts", rank: 9 },
    { suit: "clubs", rank: 10 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("OnePair");
});

test("Test PokerHandRate for High Card", () => {
  var cards = [
    { suit: "diamonds", rank: 10 },
    { suit: "spades", rank: 12 },
    { suit: "hearts", rank: 8 },
    { suit: "clubs", rank: 5 },
    { suit: "clubs", rank: 11 }
  ];
  var result = PokerHandRate(new RateableCards(cards));
  expect(result).toEqual("HighCard");
});
