import React, { useState } from "react";
import AddMovie from "../../components/Header/AddMovie";
import HeaderTitle from "../../components/Header/Title/index";
import FinderTitle from "../../components/Finder/Title/index";
import InputSearch from "../../components/Finder/InputSearch";
import ButtonSearch from "../../components/Finder/ButtonSearch";

export default function Header({ handlerClickAddMovie }) {
  return (
    <header className={"header"}>
      <section className={"header_title"}>
        <HeaderTitle />
        <AddMovie handlerClickAddMovie={handlerClickAddMovie} />
      </section>
      <section className={"header_finder"}>
        <FinderTitle />
        <section className={"search_movie"}>
          <InputSearch />
          <ButtonSearch />
        </section>
      </section>
    </header>
  );
}
