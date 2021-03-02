import React from "react";
import EmptyImg from "../../../utils/empty.jpg";

export default function ResultCard({ id, img, title, category, year }) {
  return (
    <>
      <img src={img} width="300" height="300" alt={title} />
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

ResultCard.defaultProps = {
  img: EmptyImg,
};
