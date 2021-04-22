import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dots from "./Dots/index";
import InnerMenuIntoDots from "./Dots/InnerMenuIntoDots/index";
import {useRouter} from 'next/router'
import { route } from "next/dist/next-server/server/router";

export default function ResultCard({
  id,
  img,
  title,
  genres,
  year,
  handlerClickEditMenuItems,
  currentFilm,
  handlerClickCardWithMovie,
}) {
  const [isViewDots, setViewDots] = useState(false);
  const [isViewInnerMenu, setIsViewInnerMenu] = useState(false);
  const router = useRouter();

  const handlerMouseOverImage = (e) => {
    setViewDots(!isViewDots);
  };

  const handlerClickOnTheDots = (e) => {
    setIsViewInnerMenu(!isViewInnerMenu);
    setViewDots(!isViewDots);
  };

  const handlerClickCardsWithMovie = (e) => {
    router.push(`/?card/${currentFilm.id}`,undefined, {shallow: true});
    return handlerClickCardWithMovie(e, currentFilm);
  };

  const reGenres = genres.join(", ");
  return (
    <>
      <Image
        alt={img}
        src={img || "/me.svg"}
        width={1000}
        height={1400}
        onMouseOver={handlerMouseOverImage}
        onClick={handlerClickCardsWithMovie}
      />
      <Dots isViewDots={isViewDots} handlerClick={handlerClickOnTheDots} />
      <InnerMenuIntoDots
        isViewInnerMenu={isViewInnerMenu}
        handlerClick={handlerClickOnTheDots}
        handlerClickEditMenuItems={handlerClickEditMenuItems}
        currentFilm={currentFilm}
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
