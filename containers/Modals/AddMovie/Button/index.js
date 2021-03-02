import React from "react";

export default function Button({
  textOnTheButton,
  classNameButton,
  typeElements,
}) {
  return (
    <input
      className={classNameButton}
      type={typeElements}
      value={textOnTheButton}
    />
  );
}
