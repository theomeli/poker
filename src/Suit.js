import React from "react";

const createSuit = suit => position => {
  const [x, y, mirrored] = position;
  const mirroredClass = mirrored ? " mirrored" : "";
  const style = { left: x * 100 + "%", top: y * 100 + "%" };

  return (
    <div className={`card-suit${mirroredClass}`} style={style}>
      {suit}
    </div>
  );
};

export { createSuit };
