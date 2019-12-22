import styles from "./Suit.module.scss";

import React from "react";

const createSuit = suit => position => {
  const [x, y, mirrored] = position;
  const mirroredClass = mirrored ? ` ${styles["mirrored"]}` : "";
  const style = { left: x * 100 + "%", top: y * 100 + "%" };

  return (
    <div className={`${styles["card-suit"]}${mirroredClass}`} style={style}>
      {suit}
    </div>
  );
};

export { createSuit };
