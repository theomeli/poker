import { Card } from "./Card";
import { PokerHandRate, NumRating, RateableCards } from "./scripts/cardsRating";
import {
  appendOneCardAction,
  pushFold,
  pushCall,
  pushRaise
} from "./redux/actions/actions";

import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  InputGroup,
  Alert
} from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Deck = props => {
  const [started, setStarted] = useState(false);

  const [selectedButton, setButton] = useState(2);

  var isClosed = props.cards.opponentHand.length === 5 ? false : true;

  var finishText = null;
  if (!isClosed) {
    const myHandRateable = new RateableCards(props.cards.myHand);
    const oppHandRateable = new RateableCards(props.cards.opponentHand);
    console.log(PokerHandRate(myHandRateable));

    finishText =
      NumRating[PokerHandRate(myHandRateable)] >
      NumRating[PokerHandRate(oppHandRateable)]
        ? "You won"
        : "You lost";
  }

  const oppHandComp = props.cards.opponentHand.map((card, idx) => (
    <Card card={card} isClosed={isClosed} key={`oppCard-${idx}`} />
  ));
  const myHandComp = props.cards.myHand.map((card, idx) => (
    <Card card={card} isClosed={false} key={`myCard-${idx}`} />
  ));

  const handleChangebutton = e => {
    setButton(e.target.getAttribute("value"));
  };

  const counter =
    selectedButton === "3" ? (
      <div className="input-raise">
        {/* <Button variant="secondary">-</Button> */}
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" />
          <InputGroup.Append>
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        {/* <Button variant="secondary">+</Button> */}
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

  const [submitted, setSubmitted] = useState(false);
  const [variant, setVariant] = useState("");
  const [alertText, setAlertText] = useState("");

  const handleSubmit = (myHand, cards) => {
    setSubmitted(true);
    if (selectedButton === "1") {
      setVariant("danger");
      setAlertText("You have selected Fold. You lost your money");
    } else if (selectedButton === "2") {
      props.appendOneCardAction();
    } else {
      // console.log("adsfasdf");
    }
  };

  const alert = submitted ? <Alert variant={variant}>{alertText}</Alert> : null;

  var cards = started ? (
    <div>
      <div className="opponent-hand">{oppHandComp}</div>
      {finishText != null && <h1>{finishText}</h1>}
      <div className="my-hand">
        {myHandComp}
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
            {toggleButton(1, "Fold")}
            {toggleButton(2, "Call")}
            {toggleButton(3, "Raise")}
            {counter}
          </ToggleButtonGroup>
        </ButtonToolbar>
        <Form noValidate>
          <Button
            className="submit"
            onClick={handleSubmit.bind(props.cards.myHand, props.cards.cards)}
          >
            Submit
          </Button>
        </Form>
        {alert}
      </div>
    </div>
  ) : (
    <button onClick={() => setStarted(true)}>Start</button>
  );

  return <>{cards}</>;
};

// Deck.propTypes = {
//   option: PropTypes.object.isRequired,
//   onDispatch: PropTypes.func.isRequired
// };

// export { Deck };

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
  fold: pushFold,
  call: pushCall,
  raise: pushRaise
})(Deck);
