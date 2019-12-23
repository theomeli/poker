import MyCard from "./Card";
import BetAmount from "./BetAmount";
import styles from "./Deck.module.scss";
import ButtonsSection from "./ButtonsSection";
import { PokerHandRate, NumRating, RateableCards } from "./scripts/cardsRating";
import {
  appendOneCard,
  optionAction,
  FOLD,
  CALL,
  RAISE,
  foldSubmitted,
  setAmount
} from "./redux/actions/actions";

import { ToggleButton, Alert, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const Deck = props => {
  const handleChangebutton = e => {
    props.optionAction(e.target.getAttribute("value"));
  };

  const handleSubmit = () => {
    if (props.option === FOLD) {
      props.foldSubmitted();
    } else if (props.option === CALL) {
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

  var gameEnded = props.cards.opponentHand.length === 5;

  const result = gameEnded => {
    if (gameEnded) {
      const myHandRateable = new RateableCards(props.cards.myHand);
      const oppHandRateable = new RateableCards(props.cards.opponentHand);

      return NumRating[PokerHandRate(myHandRateable)] >
        NumRating[PokerHandRate(oppHandRateable)]
        ? "You won"
        : "You lost";
    }
    return null;
  };
  const resultText = result(gameEnded);

  const oppHandComp = props.cards.opponentHand.map((card, idx) => (
    <MyCard card={card} closed={!gameEnded} key={`oppCard-${idx}`} />
  ));
  const myHandComp = props.cards.myHand.map((card, idx) => (
    <MyCard card={card} closed={false} key={`myCard-${idx}`} />
  ));

  const foldMsg =
    props.submitted == "isSubmitted" ? (
      // props.submitted ? (
      <div className={styles["fold-msg"]}>
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

  return (
    <div>
      <div className={styles["opponent-hand"]}>{oppHandComp}</div>
      {resultText != null && <h1 className={styles["result"]}>{resultText}</h1>}
      <div className={styles["my-hand"]}>{myHandComp}</div>
      <div className={styles["buttons-section"]}>
        <ButtonsSection
          toggleButton={toggleButton}
          selectedButton={props.option}
          cards={props.cards}
        />
        <Form noValidate>
          <Button
            className={styles["submit"]}
            onClick={handleSubmit}
            disabled={gameEnded | (foldMsg != null)}
          >
            Submit
          </Button>
        </Form>
      </div>
      {foldMsg}
      <BetAmount betAmount={props.betAmount} />
    </div>
  );
};

Deck.propTypes = {
  cards: PropTypes.object.isRequired,
  option: PropTypes.string.isRequired,
  optionAction: PropTypes.func.isRequired,
  appendOneCard: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  foldSubmitted: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  betAmount: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // TODO: remove dublicated attributes
  return {
    option: state.option.option,
    cards: state.cards,
    submitted: state.foldIsSubmitted.submitted,
    betAmount: state.betAmount
  };
};

const mapDispatchToProprs = {
  appendOneCard,
  optionAction,
  foldSubmitted,
  setAmount
};

export default connect(mapStateToProps, mapDispatchToProprs)(Deck);
