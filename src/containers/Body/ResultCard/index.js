import React from "react";

export default function ResultCard({ id, img, title, category, year }) {
  return (
    <section>
      <img src={img} alt={title} />
      <div>
        <span>{title}</span>
        <span>{category}</span>
      </div>
      <div>
        <span>{year}</span>
      </div>
    </section>
  );
}
