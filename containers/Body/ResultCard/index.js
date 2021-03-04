import React, { useState } from "react";
import Image from "next/image";
import Dots from "./Dots/index";
import InnerMenuIntoDots from "./Dots/InnerMenuIntoDots/index";

export default function ResultCard({
  id,
  img,
  title,
  genre,
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
  };

  return (
    <>
      <Image
        alt={img}
        src={img}
        width={1000}
        height={1000}
        onMouseEnter={handlerMouseOverImage}
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
          <span>{genre}</span>
        </div>
        <div>
          <span>{year}</span>
        </div>
      </div>
    </>
  );
}

ResultCard.defaultProps = {
  img: "/me.svg",
};