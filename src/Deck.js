import MyCard from "./Card";
import BetAmount from "./BetAmount";
import ButtonsSection from "./ButtonsSection";
import { PokerHandRate, NumRating, RateableCards } from "./scripts/cardsRating";
import {
  appendOneCardAction,
  pushFold,
  pushCall,
  pushRaise
} from "./redux/actions/actions";

import { ToggleButton, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Deck = props => {
  const [started, setStarted] = useState(false);
  const [selectedButton, setButton] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  var isClosed = props.cards.opponentHand.length === 5 ? false : true;

  var resultText = null;
  if (!isClosed) {
    const myHandRateable = new RateableCards(props.cards.myHand);
    const oppHandRateable = new RateableCards(props.cards.opponentHand);

    resultText =
      NumRating[PokerHandRate(myHandRateable)] >
      NumRating[PokerHandRate(oppHandRateable)]
        ? "You won"
        : "You lost";
  }

  const oppHandComp = props.cards.opponentHand.map((card, idx) => (
    <MyCard card={card} isClosed={isClosed} key={`oppCard-${idx}`} />
  ));
  const myHandComp = props.cards.myHand.map((card, idx) => (
    <MyCard card={card} isClosed={false} key={`myCard-${idx}`} />
  ));

  const alert = submitted ? (
    <Alert variant="danger">You have selected Fold. You lost your money</Alert>
  ) : null;

  const handleChangebutton = e => {
    setButton(e.target.getAttribute("value"));
  };

  var toggleButton = (value, text) => (
    <ToggleButton
      variant="secondary"
      value={value}
      onClick={handleChangebutton}
    >
      {text}
    </ToggleButton>
  );

  const handleSubmit = () => {
    if (selectedButton === "1") {
      setSubmitted(true);
    } else if (selectedButton === "2") {
      props.appendOneCardAction();
    } else {
      // console.log("adsfasdf");
    }
  };

  var cards = started ? (
    <div>
      <div className="opponent-hand">{oppHandComp}</div>
      {resultText != null && <h1>{resultText}</h1>}
      <div className="my-hand">
        {myHandComp}
        <ButtonsSection
          toggleButton={toggleButton}
          selectedButton={selectedButton}
          handleSubmit={handleSubmit}
          cards={props.cards}
        />
        {alert}
      </div>
      {BetAmount}
    </div>
  ) : (
    <button onClick={() => setStarted(true)}>Start</button>
  );

  return <>{cards}</>;
};

Deck.propTypes = {
  cards: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  appendOneCardAction: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    option: state.option,
    cards: state.cards,
    myHand: state.myHand,
    opponentHand: state.opponentHand
  };
};

export default connect(mapStateToProps, {
  appendOneCardAction: appendOneCardAction,
  // pushOptionButton: pushOptionButton
  fold: pushFold,
  call: pushCall,
  raise: pushRaise
})(Deck);
