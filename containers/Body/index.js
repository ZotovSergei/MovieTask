import React from "react";
import Filter from "../Body/Filter/index";
import ResultMovieCount from "../Body/ResultMovieCount/index";
import ListResultCard from "../Body/ListResultCard/index";
import NoMoviesFound from "./NoMoviesFound/Index";

export default function Body({
  category,
  handlerClickEditMenuItems,
  movies,
  actionWithPage,
  handlerClickFilterOnCategory,
  handlerClickCardWithMovie,
}) {
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
        <Filter
          filter={categoryFilter}
          handlerClickFilterOnCategory={handlerClickFilterOnCategory}
        />
        <Filter filter={sortFilter} />
      </section>

      <ResultMovieCount countMovies={!!movies ? movies.length : 888} />
      {movies.length > 0 ? (
        <ListResultCard
          handlerClickEditMenuItems={handlerClickEditMenuItems}
          movies={movies}
          actionWithPage={actionWithPage}
          handlerClickCardWithMovie={handlerClickCardWithMovie}
        />
      ) : (
        <NoMoviesFound />
      )}
    </section>
  );
}
