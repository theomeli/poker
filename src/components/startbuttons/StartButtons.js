import styles from "./StartButtons.module.scss";

import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import React from "react";

const StartButtons = ({ onClick }) => (
  <div className={styles["start-buttons"]}>
    <Button variant="primary" size="lg" block onClick={onClick}>
      Start New Game
    </Button>
    <Button variant="secondary" size="lg" block disabled onClick={onClick}>
      Start Multiplayer Game (Coming Soon)
    </Button>
  </div>
);

StartButtons.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default StartButtons;
