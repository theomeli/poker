const SUBMITTED = "isSubmitted";
const NOT_SUBMITTED = "isNotSubmitted";

const foldIsSubmitted = () => ({ type: SUBMITTED, payload: true });

const foldIsNotSubmitted = () => ({ type: NOT_SUBMITTED, payload: false });

foldIsSubmitted.type = SUBMITTED;
foldIsNotSubmitted.type = NOT_SUBMITTED;

export { foldIsSubmitted, foldIsNotSubmitted };
