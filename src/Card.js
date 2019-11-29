import { RankMapping, Ranks } from "./scripts/cardsRating";
import { suitPositions } from "./suitPositions";
import { createSuit } from "./Suit";
import back from "./back.png";

import React from "react";

function Card(props) {
  const colorClass =
    props.card.suit === "♥︎" || props.card.suit === "♦︎"
      ? "card red"
      : "card black";

  if (!props.isClosed) {
    return (
      <div className={colorClass}>
        {/* <div className="card-suits">
          {suitPositions[Ranks.indexOf(props.card.rank)].map(
            createSuit(props.card.suit)
          )}
        </div> */}
        <div className="card-topleft">
          <div className="card-corner-rank">{RankMapping[props.card.rank]}</div>
          <div className="card-corner-suit">{props.card.suit}</div>
        </div>
        <div className="card-bottomright">
          <div className="card-corner-rank">{RankMapping[props.card.rank]}</div>
          <div className="card-corner-suit">{props.card.suit}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={colorClass}>
      <img src={back} alt="A Card" />
    </div>
  );
}

export { Card };
