const SUBMITTED = "isSubmitted";
const NOT_SUBMITTED = "isNotSubmitted";

const foldSubmitted = () => ({ type: SUBMITTED, payload: true });

const foldNotSubmitted = () => ({ type: NOT_SUBMITTED, payload: false });

foldSubmitted.type = SUBMITTED;
foldNotSubmitted.type = NOT_SUBMITTED;

export { foldSubmitted, foldNotSubmitted };
