import RaiseAmount from "../raiseamount/RaiseAmount";

import { ToggleButtonGroup, ButtonToolbar } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

// TODO: split RaiseAmount from ButtonToolbar
const ButtonSections = ({ toggleButton, selectedButton }) => (
  <>
    <ButtonToolbar>
      <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
        {toggleButton(1, "Fold")}
        {toggleButton(2, "Call")}
        {toggleButton(3, "Raise")}
        {RaiseAmount(selectedButton)}
      </ToggleButtonGroup>
    </ButtonToolbar>
  </>
);

ButtonSections.propTypes = {
  toggleButton: PropTypes.func.isRequired,
  selectedButton: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired
};

export default ButtonSections;
