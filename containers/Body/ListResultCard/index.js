import React, { useEffect, useState } from "react";
import ResultCard from "../ResultCard/index";
import {Link} from 'react-router-dom'

export default function ListResultCard({
  handlerClickEditMenuItems,
  movies,
  actionWithPage,
  handlerClickCardWithMovie,
}) {
  const listCards = movies.map((item) => {
    return (
      <li key={item.id} id={item.id} className={"result_card"}>
        {/* <Link to={`/card/${item.id}`}> */}
        <ResultCard
          currentFilm={item}
          id={item.id}
          img={item.poster_path || "/me.svg"}
          // img={false}
          title={item.title}
          genres={item.genres}
          year={item.release_date}
          handlerClickEditMenuItems={handlerClickEditMenuItems}
          handlerClickCardWithMovie={handlerClickCardWithMovie}
          />
          {/* </Link> */}
      </li>
    );
  });

  return <ul className={"list_result_card"}>{listCards}</ul>;
}

// export async function getServerSideProps(context) {
//   const res = await fetch(`http://localhost:4000/movies`);
//   const movies = await res.json();
//   return {
//     props: { movies }, // will be passed to the page component as props
//   };
// }
