export const START_GAME = "START_GAME";
export const ADD_CARD = "ADD_CARD";

export function startGame() {
  return { type: START_GAME };
}

export function addCard() {
  return { type: ADD_CARD };
}
