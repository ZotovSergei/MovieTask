import React from "react";

export default function ResultMovieCount({ countMovies }) {
  return (
    <section className={"result_movie_count"}>
      <p>
        <span style={{ fontWeight: "700" }}>{countMovies}</span> MOVIE COUNT
      </p>
    </section>
  );
}
