import React from "react";
import Cross from "../../../../../components/Buttons/Cross";

export default function InnerMenuIntoDots({
  isViewInnerMenu,
  handlerClick,
  handlerClickEditMenuItems,
  currentFilm
}) {
  const wrapHandlerClickEditMenuItems = (e) => {
    return handlerClickEditMenuItems(e,currentFilm);
  }
  return isViewInnerMenu ? (
    <div className={"inner_menu_dots"} onMouseLeave={handlerClick}>
      <ul className={"edit_menu"}>
        <li data-item={"edit"} onClick={wrapHandlerClickEditMenuItems}>
          EDIT
        </li>
        <li data-item={"delete"} onClick={handlerClickEditMenuItems}>
          DELETE
        </li>
      </ul>
      <Cross handlerClickAddMovie={handlerClick} />
    </div>
  ) : (
    <>{false}</>
  );
}
