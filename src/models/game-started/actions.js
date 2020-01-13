const GAME_STARTED = "GAME_STARTED";
const GAME_NOT_STARTED = "GAME_NOT_STARTED";

const gameStarted = () => ({ type: GAME_STARTED, payload: true });

const gameNotStarted = () => ({ type: GAME_NOT_STARTED, payload: false });

gameStarted.type = GAME_STARTED;
gameNotStarted.type = GAME_NOT_STARTED;

export { gameStarted, gameNotStarted };
