import { RAISE } from "./redux/actions/actions";

import { FormControl, InputGroup } from "react-bootstrap";
import React from "react";

const RaiseAmount = selectedButton =>
  selectedButton === RAISE ? (
    <div className="input-raise">
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Append>
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  ) : null;

export default RaiseAmount;
