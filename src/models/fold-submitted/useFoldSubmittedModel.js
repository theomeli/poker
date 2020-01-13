export const SUBMITTED = "isSubmitted";
export const NOT_SUBMITTED = "isNotSubmitted";

export function foldSubmitted() {
  return { type: SUBMITTED };
}

export function foldNotSubmitted() {
  return { type: NOT_SUBMITTED };
}
