import React from "react";

export default function ResultCard({ id, img, title, category, year }) {
  return (
    <>
      <img src={img} alt={title} />
      <div className={"result_description"}>
        <div className={"result_description_title"}>
          <span>{title}</span>
          <span>{category}</span>         
        </div>
        <div>
          <span>{year}</span>
        </div>
      </div>
      </>
  );
}
