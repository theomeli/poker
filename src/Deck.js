import MyCard from "./Card";
import BetAmount from "./BetAmount";
import ButtonsSection from "./ButtonsSection";
import { PokerHandRate, NumRating, RateableCards } from "./scripts/cardsRating";
import {
  appendOneCard,
  optionAction,
  FOLD,
  CALL,
  RAISE,
  isSubmitted,
  isNotSubmitted,
  setAmount
} from "./redux/actions/actions";

import { ToggleButton, Alert, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Deck = props => {
  const [started, setStarted] = useState(false);

  const handleChangebutton = e => {
    props.optionAction(e.target.getAttribute("value"));
  };

  const handleSubmit = () => {
    props.isSubmitted();
    if (props.option === CALL) {
      props.appendOneCard();
    } else if (props.option === RAISE) {
      var value = document.getElementsByClassName("form-control")[0].value;
      // TODO: remove dublicated attributes
      props.setAmount(
        (parseInt(props.betAmount.betAmount) + 2 * parseInt(value)).toString()
      );
      props.appendOneCard();
    }
  };

  var cardsClosed = props.cards.opponentHand.length === 5 ? false : true;

  const result = cardsClosed => {
    if (!cardsClosed) {
      const myHandRateable = new RateableCards(props.cards.myHand);
      const oppHandRateable = new RateableCards(props.cards.opponentHand);

      return NumRating[PokerHandRate(myHandRateable)] >
        NumRating[PokerHandRate(oppHandRateable)]
        ? "You won"
        : "You lost";
    }
    return null;
  };
  const resultText = result(cardsClosed);

  const oppHandComp = props.cards.opponentHand.map((card, idx) => (
    <MyCard card={card} closed={cardsClosed} key={`oppCard-${idx}`} />
  ));
  const myHandComp = props.cards.myHand.map((card, idx) => (
    <MyCard card={card} closed={false} key={`myCard-${idx}`} />
  ));

  const foldMsg =
    props.submitted.submitted && props.option === FOLD ? (
      <div className="fold-msg">
        <Alert variant="danger">
          You have selected Fold. You lost your money
        </Alert>
      </div>
    ) : null;

  var toggleButton = (value, text) => (
    <ToggleButton
      variant="secondary"
      value={value}
      onClick={handleChangebutton}
    >
      {text}
    </ToggleButton>
  );

  var cards = started ? (
    <div>
      <div className="opponent-hand">{oppHandComp}</div>
      {resultText != null && <h1 className="result">{resultText}</h1>}
      <div className="my-hand">{myHandComp}</div>
      <div className="buttons-section">
        <ButtonsSection
          toggleButton={toggleButton}
          selectedButton={props.option}
          cards={props.cards}
        />
        <Form noValidate>
          <Button className="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      {foldMsg}
      <BetAmount betAmount={props.betAmount} />
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
  appendOneCard: PropTypes.func.isRequired,
  submitted: PropTypes.object.isRequired,
  isSubmitted: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  betAmount: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // TODO: remove dublicated attributes
  return {
    option: state.option.option,
    cards: state.cards,
    submitted: state.submitted,
    betAmount: state.betAmount
  };
};

const mapDispatchToProprs = {
  appendOneCard,
  optionAction,
  isSubmitted,
  isNotSubmitted,
  setAmount
};

export default connect(mapStateToProps, mapDispatchToProprs)(Deck);
