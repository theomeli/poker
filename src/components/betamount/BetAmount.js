import styles from "./BetAmount.module.scss";
import { Card } from "react-bootstrap";

import PropTypes from "prop-types";
import React from "react";

const BetAmount = ({ betAmount }) => (
  <div className={styles["bootstrap-card"]}>
    <Card bg="secondary" text="white" style={{ width: "18rem" }}>
      <Card.Header>Bet Amount</Card.Header>
      <Card.Body>
        <Card.Text>{betAmount.betAmount}$</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default BetAmount;

BetAmount.propTypes = {
  betAmount: PropTypes.object.isRequired
};
