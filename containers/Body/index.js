import React from "react";
import Filter from "../Body/Filter/index";
import ResultMovieCount from "../Body/ResultMovieCount/index";
import ListResultCard from "../Body/ListResultCard/index";

export default function Body({ handlerClickEditMenuItems, movies }) {
  const category = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];
  const categoryFilter = category.map((item, index) => {
    return <li key={index}>{item}</li>;
  });
  const sort = ["SORT BY", "RELEASE DATE"];
  const sortFilter = sort.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <section className={"result"}>
      <section className={"filter"}>
        <Filter filter={categoryFilter} />
        <Filter filter={sortFilter} />
      </section>

      <ResultMovieCount />
      <ListResultCard handlerClickEditMenuItems={handlerClickEditMenuItems} movies={movies}/>
    </section>
  );
}