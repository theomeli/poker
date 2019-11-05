import { Card } from "./Card";
import { Cards } from "./scripts/cardsRating";
import { myHand, opponentHand, cards } from "./scripts/game";

import { ButtonGroup, Button } from "react-bootstrap";

import React from "react";

// function RandomCards(props) {
//   return Cards.map(card => <Card card={card} isClosed={true} />);
// }

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      fold: false,
      call: false,
      raise: false
    };
    this.handleStart = this.handleStart.bind(this);
  }
  handleStart() {
    this.setState({ started: true });
  }
  render() {
    var oppHandComp = opponentHand.map(card => (
      <Card card={card} isClosed={true} />
    ));
    var myHandComp = myHand.map(card => <Card card={card} isClosed={false} />);

    const raiseButton = <Button variant="secondary">Raise</Button>;

    console.log(raiseButton.props.active);

    const counter = raiseButton.props.active ? (
      <div>
        <Button variant="secondary">-</Button>
        <input></input>
        <Button variant="secondary">+</Button>
      </div>
    ) : null;

    var cards = this.state.started ? (
      // <RandomCards />
      <div>
        <div className="opponent-hand">{oppHandComp}</div>
        <div className="my-hand">
          {myHandComp}
          {/* <form className="decision">
            <label>
              <input
                type="checkbox"
                name="fold"
                value={this.state.fold}
                onClick={this.handleCheckbox}
              />
              Fold
              Fold
            </label>
            <label>
              <input
                type="checkbox"
                name="call"
                value={this.state.call}
                onClick={this.handleCheckbox}
              />
              Call
            </label>
            <label>
              <input
                type="checkbox"
                name="raise"
                value={this.state.raise}
                onClick={this.handleCheckbox}
              />
              Raise
            </label>
          </form> */}
          <ButtonGroup aria-label="Basic example" className="decision">
            <Button variant="secondary">Fold</Button>
            <Button variant="secondary">Call</Button>
            {raiseButton}
            {counter}
          </ButtonGroup>
          <Button className="submit">Submit</Button>
          {/* InputGroup bootstrap */}
        </div>
      </div>
    ) : (
      <button onClick={this.handleStart}>Start</button>
    );

    return <React.Fragment>{cards}</React.Fragment>;
  }
}

export { Deck };
