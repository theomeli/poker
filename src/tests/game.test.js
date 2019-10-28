import { myHand, opponentHand, cards } from "../scripts/game";

test("Test cards length", () => {
  expect(myHand.length).toEqual(3);
  expect(opponentHand.length).toEqual(3);
  expect(cards.length).toEqual(46);
});
