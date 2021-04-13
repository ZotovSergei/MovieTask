import React from "react";
import Filter from "./Filter/Filter";
import FilterOrder from "./Filter/FilterOrder";
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
  handlerSortClick,
  handlerSortChangeItem
}) {
  const categoryFilter = category.map((item, index) => {
    return <li key={index}>{item}</li>;
  });
  const sort = ["SORT BY", ["RELEASE DATE", "GENRE", "RATING"]];
  //   <select>
  //   multiple={true} value={categoryFilter}
  // </select>
  const sortFilter = sort.map((item, index) => {
    if (typeof item === "object") {
      const i = item.map((el, idx) => {
        return (
          <option key={idx} value={el}>
            {el}
          </option>
        );
      });
      const select = <select onChange={handlerSortChangeItem}>value={i}</select>;
      item = select;
    }
    return <li key={index}>{item}</li>;
  });

  return (
    <section className={"result"}>
      <section className={"filter"}>
        <Filter
          filter={categoryFilter}
          handlerClickFilterOnCategory={handlerClickFilterOnCategory}
        />
        <FilterOrder
          filter={sortFilter}
          handlerClickFilterOnCategory={handlerSortClick}
        />
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
