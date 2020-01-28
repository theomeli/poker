import { reducer as betAmount } from "models/bet-amount";
import { reducer as buttonOption } from "models/button-option";
import { reducer as cards } from "models/cards";
import { reducer as foldSubmitted } from "models/fold-submitted";
import { reducer as gameStarted } from "models/game-started";

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const ModelProvider = ({ children }) => {
  const rootReducer = combineReducers(
    betAmount,
    buttonOption,
    cards,
    foldSubmitted,
    gameStarted
  );

  const store = createStore(rootReducer);

  return <Provider store={store}>{children}</Provider>;
};

ModelProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export default ModelProvider;
