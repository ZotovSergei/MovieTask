import React from "react";

export default function Filter({ filter,handlerClickFilterOnCategory }) {
  return <ul className={"result_filter"} onClick={handlerClickFilterOnCategory}>{filter}</ul>;
}
