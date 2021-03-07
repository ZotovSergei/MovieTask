import React from "react";

export default function ButtonSearch({handlerClickSearch}) {

  const handlerClick = (e) => {
    const input = document.querySelector('#search_input').value;
    if (!input) return
    return handlerClickSearch(e,input)
  }

  return (
    <>
      <button onClick={handlerClick}>SEARCH</button>
    </>
  );
}
