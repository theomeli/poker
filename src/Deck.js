import React from "react";

import { Card } from "./Card";
import { Cards } from "./scripts/cardsRating";

function RandomCards(props) {
  return Cards.map(card => <Card card={card} />);
}

function Deck(props) {
  return (
    <div className="deck">
      <RandomCards />
    </div>
  );
}

export { Deck };
