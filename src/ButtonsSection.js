import RaiseAmount from "./RaiseAmount";

import { ToggleButtonGroup, ButtonToolbar } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

// TODO: split RaiseAmount from ButtonToolbar
const ButtonSections = props => (
  <>
    <ButtonToolbar>
      <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
        {props.toggleButton(1, "Fold")}
        {props.toggleButton(2, "Call")}
        {props.toggleButton(3, "Raise")}
        {RaiseAmount(props.selectedButton)}
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
