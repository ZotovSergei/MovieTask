import React from "react";
import Image from "next/image";

export default function BackToSearchSection({
  handlerClickOnBackSearchButton,
}) {
  return (
    <div className="back_to_search">
      <Image
        alt="/seacrhImage.svg"
        src="/seacrhImage.svg"
        width={1000}
        height={1400}
        onClick={handlerClickOnBackSearchButton}
        // onMouseOver={handlerMouseOverImage}
        // onMouseDown={handlerMouseOverImage}
      />
    </div>
  );
}
