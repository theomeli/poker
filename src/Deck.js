import MyCard from "./Card";
import BetAmount from "./BetAmount";
import ButtonsSection from "./ButtonsSection";
import { PokerHandRate, NumRating, RateableCards } from "./scripts/cardsRating";
import {
  appendOneCardAction,
  optionAction,
  isSubmitted,
  isNotSubmitted
} from "./redux/actions/actions";

import { ToggleButton, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Deck = props => {
  const [started, setStarted] = useState(false);

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

  const alert =
    props.submitted.submitted && props.option === "1" ? (
      <Alert variant="danger">
        You have selected Fold. You lost your money
      </Alert>
    ) : null;

  // TODO: make it simpler, use the reducer
  const handleChangebutton = e => {
    props.optionAction(e.target.getAttribute("value"));
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

  // TODO: make option string instead of object
  const handleSubmit = () => {
    props.isSubmitted();
    if (props.option === "2") {
      props.appendOneCardAction();
    } else if (props.option === "3") {
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
          selectedButton={props.option}
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
  option: PropTypes.string.isRequired,
  optionAction: PropTypes.func.isRequired,
  appendOneCardAction: PropTypes.func.isRequired,
  submitted: PropTypes.object.isRequired,
  isSubmitted: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // TODO: remove dublicated attributes
  return {
    option: state.option.option,
    cards: state.cards,
    submitted: state.submitted
  };
};

const mapDispatchToProprs = {
  appendOneCardAction,
  optionAction,
  isSubmitted,
  isNotSubmitted
};

export default connect(mapStateToProps, mapDispatchToProprs)(Deck);
