import MyCard from "../card/Card";
import BetAmount from "../betamount/BetAmount";
import styles from "./Deck.module.scss";
import ButtonsSection from "../buttonssection/ButtonsSection";
import { PokerHandRate, NumRating, RateableCards } from "libraries/cardsRating";
// import {
//   appendOneCard,
//   optionAction,
//   FOLD,
//   CALL,
//   RAISE,
//   foldSubmitted,
//   setAmount
// } from "../../redux/actions/actions";

import { ToggleButton, Alert, Form, Button } from "react-bootstrap";

// import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const Deck = ({
  optionAction,
  option,
  foldSubmitted,
  appendOneCard,
  setAmount,
  cards,
  submitted,
  betAmount
}) => {
  const handleChangebutton = e => {
    optionAction(e.target.getAttribute("value"));
  };

  const handleSubmit = () => {
    if (option === "FOLD") {
      foldSubmitted();
    } else if (option === "CALL") {
      appendOneCard();
    } else if (option === "RAISE") {
      var value = document.getElementsByClassName("form-control")[0].value;
      // TODO: remove dublicated attributes
      setAmount(
        (parseInt(betAmount.betAmount) + 2 * parseInt(value)).toString()
      );
      appendOneCard();
    }
  };

  var gameEnded = cards.opponentHand.length === 5;

  const result = gameEnded => {
    if (gameEnded) {
      const myHandRateable = new RateableCards(cards.myHand);
      const oppHandRateable = new RateableCards(cards.opponentHand);

      return NumRating[PokerHandRate(myHandRateable)] >
        NumRating[PokerHandRate(oppHandRateable)]
        ? "You won"
        : "You lost";
    }
    return null;
  };
  const resultText = result(gameEnded);

  const oppHandComp = cards.opponentHand.map((card, idx) => (
    <MyCard card={card} closed={!gameEnded} key={`oppCard-${idx}`} />
  ));
  const myHandComp = cards.myHand.map((card, idx) => (
    <MyCard card={card} closed={false} key={`myCard-${idx}`} />
  ));

  const foldMsg =
    submitted === "isSubmitted" ? (
      // submitted ? (
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
          selectedButton={option}
          cards={cards}
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
      <BetAmount betAmount={betAmount} />
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

// const mapStateToProps = state => {
//   // TODO: remove dublicated attributes
//   return {
//     option: state.option.option,
//     cards: state.cards,
//     submitted: state.foldIsSubmitted.submitted,
//     betAmount: state.betAmount
//   };
// };

// const mapDispatchToProprs = {
//   appendOneCard,
//   optionAction,
//   foldSubmitted,
//   setAmount
// };

// export default connect(mapStateToProps, mapDispatchToProprs)(Deck);
export default Deck;
