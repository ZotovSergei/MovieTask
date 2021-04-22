console.log("hello");

import React from "react";
// import ReactDOM from "react-dom";
import App from "../containers/App/index";
import { Provider } from "react-redux";
import Link from "next/link";
import store from "../src/store/index";
import { setMovies, fetchData } from "../src/store/actionCreators";
// import "../index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />,
//   </React.StrictMode>,
//   document.getElementById("root")
// );

function HomePage({ url, data, offset }) {
  // store.dispatch(setMovies(data));
  // store
  //   .dispatch(fetchData(0))
  //   .then(() => console.log("pages", store.getState()));
  return (
    <Provider store={store}>
        <App /* movies={data} url={url} offset={offset} */ />
    </Provider>
  );
  // </Provider>;
}

export async function getServerSideProps(context) {
  let offset = 0;
  const url = `http://localhost:4000/movies`;
  const res = await fetch(url);
  const data = await res.json();
  offset += 10;
  return {
    props: { data, url, offset }, // will be passed to the page component as props
  };
}

export default HomePage;
