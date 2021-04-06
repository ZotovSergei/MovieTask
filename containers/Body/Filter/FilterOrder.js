import React from "react";

export default function FilterOrder({ filter, handlerClickFilterOnCategory }) {
  return (
    <ul
      className={"result_filter"}
      data-set={"dataExample"}
      onClick={handlerClickFilterOnCategory}
    >
      {filter}
    </ul>
  );
}
