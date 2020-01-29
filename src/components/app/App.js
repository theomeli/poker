import StartButtons from "../startbuttons/StartButtons";
import ModelProvider from "./model-provider";

import PropTypes from "prop-types";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Deck from "components/deck/Deck";
// import { connect } from "react-redux";

const App = ({ started, startGame }) => {
  console.log(started);
  console.log(startGame);

  return (
    <ModelProvider>
      {started ? <Deck /> : <StartButtons onClick={startGame} />}
    </ModelProvider>
  );
};

App.propTypes = {
  started: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired
};

// const mapStateToProps = state => {
//   return {
//     started: state.gameStarted.started
//   };
// };

// const mapDispatchToProps = {
//   startGame,
//   notStartGame
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
