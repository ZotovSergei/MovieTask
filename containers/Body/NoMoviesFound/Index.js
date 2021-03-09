import React, { useEffect } from "react";

export default function NoMoviesFound() {
  useEffect(() => {
    window.removeEventListener("scroll", (e) => {
      if (
        e.target.scrollingElement.offsetHeight -
          e.target.scrollingElement.scrollTop <=
        1040
      ) {
        this.getServerSideProps();
        e.preventDefault();
      }
    });
  }, []);
  return <section className="no-movies-found">No Movies Found</section>;
}
