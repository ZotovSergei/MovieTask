import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dots from "./Dots/index";
import InnerMenuIntoDots from "./Dots/InnerMenuIntoDots/index";

export default function ResultCard({
  id,
  img,
  title,
  genres,
  year,
  handlerClickEditMenuItems,
}) {
  const [isViewDots, setViewDots] = useState(false);
  const [isViewInnerMenu, setIsViewInnerMenu] = useState(false);

  const handlerMouseOverImage = () => {
    setViewDots(!isViewDots);
  };

  const handlerClickOnTheDots = () => {
    setIsViewInnerMenu(!isViewInnerMenu);
    setViewDots(!isViewDots);
  };

  const reGenres = genres.join(", ");
  return (
    <>
      <Image
        alt={img}
        src={img}
        width={1000}
        height={1400}
        onMouseOver={handlerMouseOverImage}
        onMouseDown={handlerMouseOverImage}
      />
      <Dots isViewDots={isViewDots} handlerClick={handlerClickOnTheDots} />
      <InnerMenuIntoDots
        isViewInnerMenu={isViewInnerMenu}
        handlerClick={handlerClickOnTheDots}
        handlerClickEditMenuItems={handlerClickEditMenuItems}
      />
      <div className={"result_description"}>
        <div className={"result_description_title"}>
          <span>{title}</span>
          <span>{reGenres}</span>
        </div>
        <div>
          <span>{year.slice(0, 4)}</span>
        </div>
      </div>
    </>
  );
}

ResultCard.defaultProps = {
  img: "/me.svg",
};
