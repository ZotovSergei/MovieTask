console.log("hello");


import React from "react";
// import ReactDOM from "react-dom";
import App from "../containers/App/index";
// import "../index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />,
//   </React.StrictMode>,
//   document.getElementById("root")
// );

function HomePage({data}) {
  return <App movies={data}/>
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:4000/movies`)
  const data = await res.json()

  return {
    props: {data}, // will be passed to the page component as props
  }
}


export default HomePage
