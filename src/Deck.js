import MyCard from "./Card";
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
  Alert,
  Card
} from "react-bootstrap";

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

  const handleSubmit = () => {
    if (selectedButton === "1") {
      setSubmitted(true);
    } else if (selectedButton === "2") {
      props.appendOneCardAction();
    } else {
      // console.log("adsfasdf");
    }
  };

  const alert = submitted ? (
    <Alert variant="danger">You have selected Fold. You lost your money</Alert>
  ) : null;

  var cards = started ? (
    <div>
      <div className="opponent-hand">{oppHandComp}</div>
      {resultText != null && <h1>{resultText}</h1>}
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

      {/* <div style={{ display: table-cell, vertical-align: middle, height: 550px;}}> */}
      <div className="bootstrap-card">
        <Card bg="secondary" text="white" style={{ width: "18rem" }}>
          <Card.Header>Bet Amount</Card.Header>
          <Card.Body>
            <Card.Text>50$</Card.Text>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  ) : (
    <button onClick={() => setStarted(true)}>Start</button>
  );

  return <>{cards}</>;
};

Deck.propTypes = {
  cards: PropTypes.object.isRequired,
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
  fold: pushFold,
  call: pushCall,
  raise: pushRaise
})(Deck);
