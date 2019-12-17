export const START_GAME = "START_GAME";
export const APPEND_ONE_CARD = "APPEND_ONE_CARD";
export const FOLD = "1";
export const CALL = "2";
export const RAISE = "3";
export const SUBMITTED = true;
export const NOT_SUBMITTED = false;

export function startGame() {
  return { type: START_GAME };
}

export function appendOneCardAction() {
  return { type: APPEND_ONE_CARD };
}

export function optionAction(option) {
  return { type: option };
}

export function isSubmitted() {
  return { type: SUBMITTED };
}

export function isNotSubmitted() {
  return { type: NOT_SUBMITTED };
}
