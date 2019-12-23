import StartButtons from "./StartButtons";
import { startGame, notStartGame } from "./redux/actions/actions";

import PropTypes from "prop-types";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Deck from "./Deck";
import { connect } from "react-redux";

const App = props => {
  return props.started ? <Deck /> : <StartButtons onClick={props.startGame} />;
};

App.propTypes = {
  started: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    started: state.gameStarted.started
  };
};

const mapDispatchToProps = {
  startGame,
  notStartGame
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
