import React, { Component } from "react";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import ModalBoxAddMovie from "../Modals/AddMovie/index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalBoxAddMovie: false,
      isModalBoxEditMovie: false,
      isModalBoxDeleteMovie: false,
      titleModalBox: "ADD MOVIE",
      flagModalBox: "add",
    };
  }

  handlerClickCallModalBox = (e) => {
    if (e.target.dataset.item === "add")
      this.setState({
        isModalBoxAddMovie: !this.state.isModalBoxAddMovie,
        flagModalBox: e.target.dataset.item,
        titleModalBox: "ADD MOVIE",
      });
    if (e.target.dataset.item === "edit")
      this.setState({
        isModalBoxEditMovie: !this.state.isModalBoxEditMovie,
        flagModalBox: e.target.dataset.item,
        titleModalBox: "EDIT MOVIE",
      });
    if (e.target.dataset.item === "delete")
      this.setState({
        isModalBoxDeleteMovie: !this.state.isModalBoxDeleteMovie,
        flagModalBox: e.target.dataset.item,
        titleModalBox: "DELETE MOVIE",
      });
    document.querySelector("header").classList.toggle("blur");
    document.querySelector(".result").classList.toggle("blur");
  };

  handlerClickCloseModalBox = () => {
    this.setState({ isModalBoxAddMovie: false });
    this.setState({ isModalBoxEditMovie: false });
    this.setState({
      isModalBoxDeleteMovie: false,
    });
    document.querySelector("header").classList.toggle("blur");
    document.querySelector(".result").classList.toggle("blur");
  };

  render() {
    return (
      <>
        <ModalBoxAddMovie
          isViewModalBox={
            this.state.isModalBoxAddMovie ||
            this.state.isModalBoxEditMovie ||
            this.state.isModalBoxDeleteMovie
          }
          handlerClickAddMovie={this.handlerClickCloseModalBox}
          titleModalBox={this.state.titleModalBox}
          flagModalBox={this.state.flagModalBox}
        />
        <Header handlerClickAddMovie={this.handlerClickCallModalBox} />
        <Body handlerClickEditMenuItems={this.handlerClickCallModalBox} movies={this.props.movies.data}/>
        <Footer />
      </>
    );
  }
}
