import React, { useEffect, useState } from "react";
import ResultCard from "../ResultCard/index";

export default function ListResultCard({
  handlerClickEditMenuItems,
  movies,
  actionWithPage,
}) {

  const listCards = movies.map((item) => {
    return (
      <li key={item.id} id={item.id} className={"result_card"}>
        <ResultCard
          currentFilm={item}
          id={item.id}
          img={null || item.poster_path}
          // img={false}
          title={item.title}
          genres={item.genres}
          year={item.release_date}
          handlerClickEditMenuItems={handlerClickEditMenuItems}
        />
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
