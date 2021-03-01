import React from "react";
import ResultCategoryFilter from "../Filter/ResultCategoryFilter/index";
import ResultSort from "../Filter/ResultSort/index";

export default function Filter({ filter }) {
  return <ul className={"result_filter"}>{filter}</ul>;
}
