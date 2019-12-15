import { FormControl, InputGroup } from "react-bootstrap";
import React from "react";

const RaiseAmount = selectedButton =>
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

export default RaiseAmount;
