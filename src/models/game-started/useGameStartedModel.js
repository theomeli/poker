import { useSelector, useDispatch } from "react-redux";
import { gameStarted, gameNotStarted } from "./actions";

const useGameStartedModel = () => {
  const started = useSelector(({ started }) => started);
  const dispatch = useDispatch();
  const startGame = () => dispatch(gameStarted());
  const notStartGame = () => dispatch(gameNotStarted());

  return {
    ...started,
    startGame,
    notStartGame
  };
};

export default useGameStartedModel;
