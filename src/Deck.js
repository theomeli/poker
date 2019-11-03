import React from "react";

import { Card } from "./Card";
import { Cards } from "./scripts/cardsRating";
import { myHand, opponentHand, cards } from "./scripts/game";

// function RandomCards(props) {
//   return Cards.map(card => <Card card={card} isClosed={true} />);
// }

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false
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
    var cards = this.state.started ? (
      // <RandomCards />
      <div>
        <div className="opponent-hand">{oppHandComp}</div>
        <div className="my-hand">
          {myHandComp}
          <form className="decision">
            <label>
              <input type="checkbox" name="fold" value="false" />
              Fold
            </label>
            <label>
              <input type="checkbox" name="call" value="false" />
              Call
            </label>
            <label>
              <input type="checkbox" name="raise" value="false" />
              Raise
            </label>
          </form>
        </div>
      </div>
    ) : (
      <button onClick={this.handleStart}>Start</button>
    );

    return <React.Fragment>{cards}</React.Fragment>;
  }
}

export { Deck };
