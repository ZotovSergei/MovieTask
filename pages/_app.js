import "../index.css";
import React from "react";
import {Router} from 'react-router-dom'
export default function MyApp({ Component, pageProps }) {
    return (
      <Component {...pageProps} />
    )
  }