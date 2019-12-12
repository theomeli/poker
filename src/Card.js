import { suitPositions } from "./suitPositions";
import { Ranks, RankMapping } from "./scripts/cardsRating";
import { createSuit } from "./Suit";
import back from "./back.png";

import PropTypes from "prop-types";
import React from "react";

function Card(props) {
  const rank = props.card.rank;
  const suit = props.card.suit;
  const mappedRank = RankMapping[rank];

  const colorClass =
    suit === "♥︎" || suit === "♦︎" ? "my-card red" : "my-card black";

  if (!props.isClosed) {
    return (
      <div className={colorClass}>
        <div className="card-suits">
          {suitPositions[Ranks.indexOf(rank)].map(createSuit(suit))}
        </div>
        <div className="card-topleft">
          <div className="card-corner-rank">{mappedRank}</div>
          <div className="card-corner-suit">{suit}</div>
        </div>
        <div className="card-bottomright">
          <div className="card-corner-rank">{mappedRank}</div>
          <div className="card-corner-suit">{suit}</div>
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

Card.propTypes = {
  card: PropTypes.object.isRequired,
  isClosed: PropTypes.bool.isRequired
};

export default Card;
