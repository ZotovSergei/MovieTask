import React from "react";

export default function AddMovie({ handlerClickAddMovie }) {
  return (
    <button
      data-item={"add"}
      className={"button_addmovie"}
      onClick={handlerClickAddMovie}
    >
      <span data-item={"add"}>+{' '}ADD MOVE</span>
    </button>
  );
}
