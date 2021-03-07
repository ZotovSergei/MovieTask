console.log("hello");

import React from "react";
// import ReactDOM from "react-dom";
import App from "../containers/App/index";
import Link from "next/link";
// import "../index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />,
//   </React.StrictMode>,
//   document.getElementById("root")
// );

function HomePage({ url, data, offset }) {
  return <App movies={data} url={url} offset={offset} />;
}
export async function getServerSideProps(context) {
  let offset = 0;
  const url = `http://localhost:4000/movies`;
  const res = await fetch(url);
  const data = await res.json();
  offset+=10;
  return {
    props: { data, url, offset }, // will be passed to the page component as props
  };
}

export default HomePage;
