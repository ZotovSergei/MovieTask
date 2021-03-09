import React, {useEffect} from "react";

export default function InputSearch({handlerClickSearch}) {

  const handlerClick = (e,str) => {
    return handlerClickSearch(e,str)
  }

  useEffect(()=>{
    const input = document.querySelector('#search_input');
    input.addEventListener('keyup',(e)=>{
      e.preventDefault();
      if (e.keyCode === 13) {
        handlerClick(e,e.target.value)
      }
    })
  },[])

  return (
    <>
      <input id={"search_input"} type="text" placeholder="What do you whant to watch?"/>
    </>
  );
}
