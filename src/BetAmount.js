import { Card } from "react-bootstrap";

import PropTypes from "prop-types";
import React from "react";

function BetAmount(props) {
  return (
    <div className="bootstrap-card">
      <Card bg="secondary" text="white" style={{ width: "18rem" }}>
        <Card.Header>Bet Amount</Card.Header>
        <Card.Body>
          <Card.Text>{props.betAmount.betAmount}$</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BetAmount;

BetAmount.propTypes = {
  betAmount: PropTypes.object.isRequired
};
