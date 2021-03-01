import React from "react";
import ResultCard from "../ResultCard/index";

export default function ListResultCard() {
  const cards = [
    {
      id: 1,
      image: "image 1",
      title: "title 1",
      description: "description 1",
      category: "category 1",
      year: "year 1",
    },
    {
      id: 2,
      image: "image 2",
      title: "title 2",
      description: "description 2",
      category: "category 2",
      year: "year 2",
    },
    {
      id: 3,
      image: "image 3",
      title: "title 3",
      description: "description 3",
      category: "category 3",
      year: "year 3",
    },
    {
      id: 4,
      image: "image 4",
      title: "title 4",
      description: "description 4",
      category: "category 4",
      year: "year 4",
    },
    {
      id: 5,
      image: "image 5",
      title: "title 5",
      description: "description 5",
      category: "category 5",
      year: "year 5",
    },
    {
      id: 6,
      image: "image 6",
      title: "title 6",
      description: "description 6",
      category: "category 6",
      year: "year 6",
    },
  ];
  const listCards = cards.map((item) => {
    return (
      <li key={item.id}>
        <ResultCard
          id={item.id}
          img={item.image}
          title={item.title}
          category={item.category}
          year={item.year}
        />
      </li>
    );
  });
  return <ul>{listCards}</ul>;
}
