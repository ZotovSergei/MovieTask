import React from "react";
import Filter from "../Body/Filter/index";
import ResultMovieCount from "../Body/ResultMovieCount/index";
import ListResultCard from "../Body/ListResultCard/index";

export default function Body({
  category,
  handlerClickEditMenuItems,
  movies,
  actionWithPage,
}) {
  const categoryFilter = category.map((item, index) => {
    return <li key={index}>{item}</li>;
  });
  const sort = ["SORT BY", "RELEASE DATE"];
  const sortFilter = sort.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <section className={"result"} onScroll={() => console.log(e)}>
      <section className={"filter"}>
        <Filter filter={categoryFilter} />
        <Filter filter={sortFilter} />
      </section>

      <ResultMovieCount countMovies={!!movies ? movies.length : 888} />
      <ListResultCard
        handlerClickEditMenuItems={handlerClickEditMenuItems}
        movies={movies}
        actionWithPage={actionWithPage}
      />
    </section>
  );
}
