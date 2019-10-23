// const tools = require("../scripts/tools");
import {
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
} from "../scripts/tools";

test("Test for Royal Flush", () => {
  const rating = getRating([
    { suit: "spades", rank: 10 },
    { suit: "spades", rank: 11 },
    { suit: "spades", rank: 12 },
    { suit: "spades", rank: 13 },
    { suit: "spades", rank: 14 }
  ]);
  expect(rating).toEqual({ verbal: "Royal Flush", rating: [10] });
});

test("Test for Straight Flush", () => {
  const rating = getRating([
    { suit: "spades", rank: 3 },
    { suit: "spades", rank: 2 },
    { suit: "spades", rank: 4 },
    { suit: "spades", rank: 5 },
    { suit: "spades", rank: 6 }
  ]);
  expect(rating).toEqual({
    verbal: "Straight Flush of 6",
    rating: [9, 6]
  });
});

test("Test for Straight Flush of 5", () => {
  const rating = getRating([
    { suit: "spades", rank: 2 },
    { suit: "spades", rank: 3 },
    { suit: "spades", rank: 4 },
    { suit: "spades", rank: 5 },
    { suit: "spades", rank: 14 }
  ]);
  expect(rating).toEqual({
    verbal: "Straight Flush of 5",
    rating: [9, 5]
  });
});

test("Test for Four of a Kind", () => {
  const rating = getRating([
    { suit: "spades", rank: 10 },
    { suit: "spades", rank: 14 },
    { suit: "hearts", rank: 14 },
    { suit: "diamonds", rank: 14 },
    { suit: "clubs", rank: 14 }
  ]);
  expect(rating).toEqual({
    verbal: "Four of a Kind of 14",
    rating: [8, 14]
  });
});

test("Test for Full House", () => {
  const rating = getRating([
    { suit: "clubs", rank: 11 },
    { suit: "spades", rank: 11 },
    { suit: "hearts", rank: 11 },
    { suit: "diamonds", rank: 12 },
    { suit: "clubs", rank: 12 }
  ]);
  expect(rating).toEqual({
    verbal: "Full House of 11",
    rating: [7, 11]
  });
});

test("Test for Flush", () => {
  const rating = getRating([
    { suit: "spades", rank: 8 },
    { suit: "spades", rank: 2 },
    { suit: "spades", rank: 4 },
    { suit: "spades", rank: 5 },
    { suit: "spades", rank: 6 }
  ]);
  expect(rating).toEqual({
    verbal: "Flush with 8, 6, 5, 4, 2",
    rating: [6, 8, 6, 5, 4, 2]
  });
});

test("Test for Straight 6", () => {
  const rating = getRating([
    { suit: "hearts", rank: 3 },
    { suit: "spades", rank: 2 },
    { suit: "spades", rank: 4 },
    { suit: "spades", rank: 5 },
    { suit: "spades", rank: 6 }
  ]);
  expect(rating).toEqual({
    verbal: "Straight of 6",
    rating: [5, 6]
  });
});

test("Test for Straight of 14", () => {
  const rating = getRating([
    { suit: "clubs", rank: 13 },
    { suit: "spades", rank: 10 },
    { suit: "spades", rank: 11 },
    { suit: "spades", rank: 12 },
    { suit: "spades", rank: 14 }
  ]);
  expect(rating).toEqual({
    verbal: "Straight of 14",
    rating: [5, 14]
  });
});

test("Test for Three of a Kind", () => {
  const rating = getRating([
    { suit: "clubs", rank: 6 },
    { suit: "spades", rank: 2 },
    { suit: "hearts", rank: 11 },
    { suit: "diamonds", rank: 11 },
    { suit: "clubs", rank: 11 }
  ]);
  expect(rating).toEqual({
    verbal: "Three of a Kind of 11",
    rating: [4, 11]
  });
});

test("Test for Two Pairs", () => {
  const rating = getRating([
    { suit: "clubs", rank: 6 },
    { suit: "spades", rank: 2 },
    { suit: "hearts", rank: 2 },
    { suit: "diamonds", rank: 11 },
    { suit: "clubs", rank: 11 }
  ]);
  expect(rating).toEqual({
    verbal: "Two Pairs of 11 and 2 with 6",
    rating: [3, 11, 2, 6]
  });
});

test("Test for One Pair", () => {
  const rating = getRating([
    { suit: "clubs", rank: 6 },
    { suit: "spades", rank: 2 },
    { suit: "hearts", rank: 3 },
    { suit: "diamonds", rank: 11 },
    { suit: "clubs", rank: 11 }
  ]);
  expect(rating).toEqual({
    verbal: "One Pair of 11 with 6, 3, 2",
    rating: [2, 11, 6, 3, 2]
  });
});

test("Test for Nothing", () => {
  const rating = getRating([
    { suit: "clubs", rank: 6 },
    { suit: "spades", rank: 3 },
    { suit: "hearts", rank: 2 },
    { suit: "diamonds", rank: 5 },
    { suit: "clubs", rank: 8 }
  ]);
  expect(rating).toEqual({
    verbal: "Nothing with 8, 6, 5, 3, 2",
    rating: [8, 6, 5, 3, 2]
  });
});

test("Test a five Straight", () => {
  const isFiveStraight = isFiveStraightFunc([14, 2, 3, 4, 5]);
  expect(isFiveStraight).toEqual(true);
});

test("Test a non five Straight", () => {
  const isFiveStraight = isFiveStraightFunc([14, 2, 3, 4, 8]);
  expect(isFiveStraight).toEqual(false);
});

test("Convert 14 to 1", () => {
  const [cards, cardRanks] = convertAsus(
    [
      { suit: "clubs", rank: 14 },
      { suit: "clubs", rank: 5 },
      { suit: "clubs", rank: 4 },
      { suit: "clubs", rank: 3 },
      { suit: "clubs", rank: 2 }
    ],
    [14, 5, 4, 3, 2]
  );
  expect(cards).toEqual([
    { suit: "clubs", rank: 5 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 2 },
    { suit: "clubs", rank: 1 }
  ]);
  expect(cardRanks).toEqual([5, 4, 3, 2, 1]);
});

test("Check the straight case", () => {
  const isStraight = isStraightFunc([
    { suit: "clubs", rank: 5 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 2 },
    { suit: "clubs", rank: 1 }
  ]);
  expect(isStraight).toEqual(true);
});

test("Check the non straight case", () => {
  const isStraight = isStraightFunc([
    { suit: "clubs", rank: 6 },
    { suit: "clubs", rank: 4 },
    { suit: "clubs", rank: 3 },
    { suit: "clubs", rank: 2 },
    { suit: "clubs", rank: 1 }
  ]);
  expect(isStraight).toEqual(false);
});

test("Check same suit with straight", () => {
  const result = checkSameSuit(
    [
      { suit: "clubs", rank: 5 },
      { suit: "clubs", rank: 4 },
      { suit: "clubs", rank: 3 },
      { suit: "clubs", rank: 2 },
      { suit: "clubs", rank: 1 }
    ],
    [5, 4, 3, 2, 1],
    true
  );
  expect(result).toEqual({
    verbal: "Straight Flush of 5",
    rating: [9, 5]
  });
});

test("Check same suit with non straight", () => {
  const result = checkSameSuit(
    [
      { suit: "clubs", rank: 6 },
      { suit: "clubs", rank: 4 },
      { suit: "clubs", rank: 3 },
      { suit: "clubs", rank: 2 },
      { suit: "clubs", rank: 1 }
    ],
    [6, 4, 3, 2, 1],
    false
  );
  expect(result).toEqual({
    verbal: "Flush with 6, 4, 3, 2, 1",
    rating: [6, 6, 4, 3, 2, 1]
  });
});

test("Check same suit with Royal Flush", () => {
  const result = checkSameSuit(
    [
      { suit: "clubs", rank: 14 },
      { suit: "clubs", rank: 13 },
      { suit: "clubs", rank: 12 },
      { suit: "clubs", rank: 11 },
      { suit: "clubs", rank: 10 }
    ],
    [14, 13, 12, 11, 10],
    true
  );
  expect(result).toEqual({ verbal: "Royal Flush", rating: [10] });
});

test("Check four max with four of a king", () => {
  const result = checkSameSuit(
    [
      { suit: "clubs", rank: 14 },
      { suit: "clubs", rank: 13 },
      { suit: "clubs", rank: 12 },
      { suit: "clubs", rank: 11 },
      { suit: "clubs", rank: 10 }
    ],
    [14, 13, 12, 11, 10],
    true
  );
  expect(result).toEqual({ verbal: "Royal Flush", rating: [10] });
});

test("Check four max of a counter with Four of a Kind", () => {
  const result = checkFourMax([[2, 4], [3, 1]], 4);
  expect(result).toEqual({
    verbal: "Four of a Kind of 2",
    rating: [8, 2]
  });
});

test("Check four max of a counter with Full House", () => {
  const result = checkFourMax([[2, 3], [3, 2]], 3);
  expect(result).toEqual({
    verbal: "Full House of 2",
    rating: [7, 2]
  });
});

test("Check three max of a counter with Three of a Kind", () => {
  const result = checkThreeMax([[2, 3], [3, 1], [4, 1]], 3);
  expect(result).toEqual({
    verbal: "Three of a Kind of 2",
    rating: [4, 2]
  });
});

test("Check three max of a counter with Two Pairs", () => {
  const result = checkThreeMax([[2, 2], [3, 2], [4, 1]], 2);
  expect(result).toEqual({
    verbal: "Two Pairs of 3 and 2 with 4",
    rating: [3, 3, 2, 4]
  });
});

test("Check get four ranks with One Pair", () => {
  const result = getFourRanks([[2, 2], [3, 1], [4, 1], [5, 1]]);
  expect(result).toEqual({
    verbal: "One Pair of 2 with 5, 4, 3",
    rating: [2, 2, 5, 4, 3]
  });
});

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

test("Check maxInOrder with a hand", () => {
  var result = maxInOrder([1, 4, 5, 6, 8]);
  expect(result).toEqual(3);
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
  expect(rateableCards.suitTimes).toEqual({});
});
