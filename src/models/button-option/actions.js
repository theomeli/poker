const FOLD = "FOLD";
const CALL = "CALL";
const RAISE = "RAISE";

const fold = () => ({ type: FOLD, payload: "1" });

const call = () => ({ type: CALL, payload: "2" });

const raise = () => ({ type: RAISE, payload: "3" });

fold.type = FOLD;
call.type = CALL;
raise.type = RAISE;

export { fold, call, raise };
