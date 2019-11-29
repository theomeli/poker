import { Card } from "./Card";
import { Cards } from "./scripts/cardsRating";
import { myHand, opponentHand, cards, appendOneCard } from "./scripts/game";

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

import React, { useState } from "react";

const Deck = () => {
  const [started, setStarted] = useState(false);

  const [selectedButton, setButton] = useState(2);

  const oppHandComp = opponentHand.map(card => (
    <Card card={card} isClosed={true} />
  ));
  const myHandComp = myHand.map(card => <Card card={card} isClosed={false} />);

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

  // redux in app.js
  //dispatch in game.js for changing the cards

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

  console.log(selectedButton);

  const handleSubmit = e => {
    setSubmitted(true);
    if (selectedButton === "1") {
      setVariant("danger");
      setAlertText("You have selected Fold. You lost your money");
    } else if (selectedButton === "2") {
      console.log("aaaaaaaaaa");
      var [myHand, cards] = appendOneCard(myHand, cards);
      var [opponentHand, cards] = appendOneCard(opponentHand, cards);
    } else {
      // console.log("adsfasdf");
    }
  };

  const alert = submitted ? <Alert variant={variant}>{alertText}</Alert> : null;

  var cards = started ? (
    <div>
      <div className="opponent-hand">{oppHandComp}</div>
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
          <Button className="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        {alert}
      </div>
    </div>
  ) : (
    <button onClick={() => setStarted(true)}>Start</button>
  );

  return <React.Fragment>{cards}</React.Fragment>;
};

export { Deck };
