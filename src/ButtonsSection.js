import RaiseAmount from "./RaiseAmount";

import {
  ToggleButtonGroup,
  Button,
  ButtonToolbar,
  Form
} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

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
    <Form noValidate>
      <Button
        className="submit"
        onClick={props.handleSubmit.bind(props.cards.myHand, props.cards.cards)}
      >
        Submit
      </Button>
    </Form>
  </>
);

ButtonSections.propTypes = {
  toggleButton: PropTypes.func.isRequired,
  selectedButton: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired
};

export default ButtonSections;
