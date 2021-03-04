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
      movies: this.props.movies.data,
      actionWithPage: "scroll",
      url: this.props.url,
      offset: this.props.offset,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", (e) => {
      if (
        e.target.scrollingElement.offsetHeight +
          e.target.scrollingElement.scrollTop ===
        e.target.scrollingElement.scrollHeight
      ) {
        console.log("", e.target.scrollingElement.offsetHeight);
        console.log("", e.target.scrollingElement.scrollTop);
        console.log(e.target.scrollingElement.scrollHeight);
        this.getServerSideProps();
      }
    });
  }

  category = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

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
          category={this.category}
        />
        <Header handlerClickAddMovie={this.handlerClickCallModalBox} />
        <Body
          category={this.category}
          handlerClickEditMenuItems={this.handlerClickCallModalBox}
          movies={
            !!this.state.movies ? this.state.movies : this.props.movies.data
          }
          actionWithPage={this.state.actionWithPage}
        />
        <Footer />
      </>
    );
  }

  async getServerSideProps(context) {
    // `http://localhost:4000/movies?search=comedy&searchBy=genres`
    const url = this.state.url + "?offset=" + +this.state.offset + 1;
    const res = await fetch(url);
    const movies1 = await res.json();
    for (let i = 0; i < movies1.data.length; i++) {
      const element = movies1.data[i];
      const film = JSON.stringify(element);
      if (
        JSON.stringify(Object.values(this.state.movies)).indexOf(film) !== -1
      ) {
        delete movies1.data[i];
      }
    }
    this.setState((state, props) => ({
      movies: state.movies.concat(movies1.data),
      offset: state.offset + 1,
    }));
    return {
      props: { movies1 }, // will be passed to the page component as props
    };
  }
}
