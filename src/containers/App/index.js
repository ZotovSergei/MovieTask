import React, { Component } from "react";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import "../../index.css";
import ModalBoxAddMovie from "../Modals/AddMovie/index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalBoxAddMovie: false,
    };
  }

  handlerClickAddMovie = () => {
    this.setState({ isModalBoxAddMovie: !this.state.isModalBoxAddMovie });
    document.querySelector("header").classList.toggle("blur");
    document.querySelector(".result").classList.toggle("blur");
  };

  render() {
    return (
      <>
        <ModalBoxAddMovie
          isViewModalBox={this.state.isModalBoxAddMovie}
          handlerClickAddMovie={this.handlerClickAddMovie}
        />
        <Header handlerClickAddMovie={this.handlerClickAddMovie} />
        <Body />
        <Footer />
      </>
    );
  }
}
