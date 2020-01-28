import { useBetAmountModel } from "models/bet-amount";
import { useButtonOption } from "models/button-option";
import { useCardsModel } from "models/cards";
import { useFoldSubmittedModel } from "models/fold-submitted";
import { useGameStartedModel } from "models/game-started";

const usePokerGameModel = () => {
  const betAmountModel = useBetAmountModel();
  const buttonOptionModel = useButtonOption();
  const cardsModel = useCardsModel();
  const foldSubmittedModel = useFoldSubmittedModel();
  const gameStartedModel = useGameStartedModel();

  return {
    ...betAmountModel,
    ...buttonOptionModel,
    ...cardsModel,
    ...foldSubmittedModel,
    ...gameStartedModel
  };
};

export default usePokerGameModel;
