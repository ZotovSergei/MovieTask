import React, { useState } from "react";
import AddMovie from "../../components/Header/AddMovie";
import HeaderTitle from "../../components/Header/Title/index";
import FinderTitle from "../../components/Finder/Title/index";
import InputSearch from "../../components/Finder/InputSearch";
import ButtonSearch from "../../components/Finder/ButtonSearch";
import BackToSearchSection from "../Modals/BackToSearchSection";
import Image from "next/image";

export default function Header({
  handlerClickAddMovie,
  handlerClickSearch,
  isViewCardMovie,
  handlerClickOnBackSearchButton,
  currentFilm,
}) {
  return (
    <header className={"header"}>
      {!isViewCardMovie ? (
        <>
          <section className={"header_title"}>
            <HeaderTitle />
            <AddMovie handlerClickAddMovie={handlerClickAddMovie} />
          </section>
          <section className={"header_finder"}>
            <FinderTitle />
            <section className={"search_movie"}>
              <InputSearch handlerClickSearch={handlerClickSearch} />
              <ButtonSearch handlerClickSearch={handlerClickSearch} />
            </section>
          </section>
        </>
      ) : (
        <>
          <section className={"header_title"}>
            <HeaderTitle />
            <BackToSearchSection
              handlerClickOnBackSearchButton={handlerClickOnBackSearchButton}
            />
          </section>
          <section className={"header_current_film"}>
            <div className="header_current_film_poster">
              <Image
                alt={currentFilm.poster_path || "/me.svg"}
                src={currentFilm.poster_path || "/me.svg"}
                width={1000}
                height={1400}
              />
            </div>
            <div className="header_current_film_desc">
              <div className="header_title_rating">
                <h2>{!!currentFilm ? currentFilm.title : ""}</h2>
                <span className="rating">
                  {!!currentFilm ? currentFilm.vote_average : ""}
                </span>
              </div>
              <span className="header_tag">
                {!!currentFilm ? currentFilm.tagline : ""}
              </span>
              <div className="header_year_runtime">
                <span>
                  {!!currentFilm
                    ? new Date(currentFilm.release_date)
                        .getFullYear()
                        .toString()
                    : ""}
                </span>
                <span>{!!currentFilm ? currentFilm.runtime + " min" : ""}</span>
              </div>
              <span className="header_overview">
                {!!currentFilm ? currentFilm.overview : ""}
              </span>
            </div>
          </section>
        </>
      )}
    </header>
  );
}
