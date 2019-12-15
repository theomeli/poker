import { Card } from "react-bootstrap";

import React from "react";

export default (
  <div className="bootstrap-card">
    <Card bg="secondary" text="white" style={{ width: "18rem" }}>
      <Card.Header>Bet Amount</Card.Header>
      <Card.Body>
        <Card.Text>50$</Card.Text>
      </Card.Body>
    </Card>
  </div>
);
