// export const START_GAME = "START_GAME";
export const APPEND_ONE_CARD = "APPEND_ONE_CARD";

export const FOLD = "1";
export const CALL = "2";
export const RAISE = "3";

export const SUBMITTED = true;
export const NOT_SUBMITTED = false;

export const BET_AMOUNT = "50";

export const GAME_STARTED = true;
export const GAME_NOT_STARTED = false;

// export function startGame() {
//   return { type: START_GAME };
// }

export function appendOneCard() {
  return { type: APPEND_ONE_CARD };
}

export function optionAction(option) {
  return { type: option };
}

export function foldSubmitted() {
  return { type: SUBMITTED };
}

export function foldNotSubmitted() {
  return { type: NOT_SUBMITTED };
}

export function setAmount(amount) {
  return { type: BET_AMOUNT, amount: amount };
}

export function startGame() {
  return { type: GAME_STARTED };
}

export function notStartGame() {
  return { type: GAME_NOT_STARTED };
}
