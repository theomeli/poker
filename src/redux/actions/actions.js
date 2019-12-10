export const START_GAME = "START_GAME";
export const APPEND_ONE_CARD = "APPEND_ONE_CARD";
export const FOLD = "FOLD";
export const CALL = "CALL";
export const RAISE = "RAISE";

export function startGame() {
  return { type: START_GAME };
}

export function appendOneCardAction() {
  return { type: APPEND_ONE_CARD };
}

export function pushFold() {
  return { type: FOLD };
}

export function pushCall() {
  return { type: CALL };
}

export function pushRaise() {
  return { type: RAISE };
}
