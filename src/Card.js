import { suitPositions } from "./suitPositions";
import { Ranks, RankMapping } from "./scripts/cardsRating";
import { createSuit } from "./Suit";
import back from "./back.png";
import styles from "./card.module.scss";

import PropTypes from "prop-types";
import React from "react";

function Card(props) {
  const rank = props.card.rank;
  const suit = props.card.suit;
  const mappedRank = RankMapping[rank];

  const colorClass =
    suit === "♥︎" || suit === "♦︎"
      ? `${styles["my-card"]} ${styles["red"]}`
      : `${styles["my-card"]} ${styles["black"]}`;

  if (!props.closed) {
    return (
      <div className={colorClass}>
        <div className={styles["card-suits"]}>
          {suitPositions[Ranks.indexOf(rank)].map(createSuit(suit))}
        </div>
        <div className={styles["card-topleft"]}>
          <div className={styles["card-corner-rank"]}>{mappedRank}</div>
          <div className={styles["card-corner-suit"]}>{suit}</div>
        </div>
        <div className={styles["card-bottomright"]}>
          <div className={styles["card-corner-rank"]}>{mappedRank}</div>
          <div className={styles["card-corner-suit"]}>{suit}</div>
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
  closed: PropTypes.bool.isRequired
};

export default Card;
