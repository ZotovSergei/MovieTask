import React from "react";

export default function AddMovie({handlerClickAddMovie}) {
  return (
    <button className={"button_addmovie"} onClick={handlerClickAddMovie}>
      <span>+ADD MOVE</span>
    </button>
  );
}
