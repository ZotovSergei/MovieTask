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
      storageMovies: this.props.movies.data,
      actionWithPage: "scroll",
      url: this.props.url,
      offset: this.props.offset,
      currentCategory: "all",
      isViewCardMovie: false,
      currentFilm: null,
      tmlUrl: null,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", (e) => {
      if (
        e.target.scrollingElement.offsetHeight -
          e.target.scrollingElement.scrollTop <=
        1040
      ) {
        this.getServerSideProps();
        e.preventDefault();
      }
    });
  }

  category = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

  handlerClickCallModalBox = (e, currentFilm) => {
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
        currentFilm: currentFilm,
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

  handlerClickFilterOnCategory = (e) => {
    let filterFilterOnCategory = this.state.storageMovies
      .map((item) => {
        item.genres = item.genres.map((it) => it.toLocaleLowerCase());
        return item;
      })
      .filter(
        (ii) =>
          ii.genres.indexOf(e.target.textContent.toLocaleLowerCase()) != -1
      );
    if (e.target.textContent.toLocaleLowerCase() === "all")
      filterFilterOnCategory = this.state.storageMovies;
    this.setState((state, props) => ({
      movies: filterFilterOnCategory,
      currentCategory: e.target.textContent,
    }));
  };

  handlerClickOnBackSearchButton = (e) => {
    this.setState({ isViewCardMovie: !this.state.isViewCardMovie });
  };

  handlerClickCardWithMovie = (e, currentFilm) => {
    this.setState({ isViewCardMovie: true, currentFilm: currentFilm });
  };

  handlerClickSearch = (e, searchStr) => {
    this.getStaticProps(searchStr);
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
          currentFilm={this.state.currentFilm}
        />
        <Header
          handlerClickAddMovie={this.handlerClickCallModalBox}
          handlerClickSearch={this.handlerClickSearch}
          isViewCardMovie={this.state.isViewCardMovie}
          handlerClickOnBackSearchButton={this.handlerClickOnBackSearchButton}
          currentFilm={this.state.currentFilm}
        />
        <Body
          category={this.category}
          handlerClickFilterOnCategory={this.handlerClickFilterOnCategory}
          handlerClickEditMenuItems={this.handlerClickCallModalBox}
          handlerClickCardWithMovie={this.handlerClickCardWithMovie}
          movies={
            !!this.state.movies ? this.state.movies : this.props.movies.data
          }
          actionWithPage={this.state.actionWithPage}
        />
        <Footer />
      </>
    );
  }

  async getStaticProps(context) {
    this.setState({ offset: 0 });
    let url = this.state.url + "?offset=" + (this.state.offset * 1 + 1);
    if (url) url = url + "&search=" + context + "&searchBy=title";
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
      storageMovies: state.storageMovies.concat(movies1.data),
      movies: movies1.data,
      offset: state.offset + 1,
    }));
    debugger;
    return {
      props: { movies1 }, // will be passed to the page component as props
    };
  }

  async getServerSideProps(context) {
    let url = this.state.url + "?offset=" + (this.state.offset * 1 + 1);
    // console.log(url)
    // `http://localhost:4000/movies?search=comedy&searchBy=genres`
    let res = null;
    let movies1 = null;
    console.log(url);
    // if (url != this.state.tmlUrl) {
    // this.setState({ tmpUrl: url });
    res = await fetch(url);
    movies1 = await res.json();
    // }

    // const tmpMovies = [];
    // for (let i = 0; i < movies1.data.length; i++) {
    //   const element = movies1.data[i];
    //   const film = JSON.stringify(element);
    //   if (
    //     JSON.stringify(Object.values(this.state.movies)).indexOf(film) !== -1
    //   ) {
    //     // tmpMovies.push(movies1.data[i])
    //     // movies1.data.splice(i,1)
    //     // delete movies1.data[i];
    //   }
    // }
    console.log(this.state.storageMovies);
    console.log(this.state.movies);
    this.setState({
      // storageMovies: state.storageMovies.concat(tmpMovies),
      // movies: state.movies.concat(tmpMovies),
      storageMovies: this.state.storageMovies.concat(movies1.data),
      movies: this.state.movies.concat(movies1.data),
      offset: this.state.offset + 10,
    });
    // console.log(this.state.storageMovies)
    // console.log(this.state.movies)
    return {
      props: { movies1 }, // will be passed to the page component as props
    };
  }
}
