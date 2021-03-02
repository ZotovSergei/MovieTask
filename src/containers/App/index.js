import React, { Component } from 'react'
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import "../../index.css";



export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
      <Header />
      <Body />
      <Footer />
    </>
    )
  }
}
