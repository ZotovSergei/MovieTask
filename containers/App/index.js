import React, { Component } from "react";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import ModalBoxAddMovie from "../Modals/AddMovie/index";
import {
  setMovies,
  getMovies,
  addMovies,
  fetchData,
  changeUrl,
} from "../../src/store/actionCreators";
import store from "../../src/store/index";
import { connect } from "react-redux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalBoxAddMovie: false,
      isModalBoxEditMovie: false,
      isModalBoxDeleteMovie: false,
      titleModalBox: "ADD MOVIE",
      flagModalBox: "add",
      movies: [],
      // movies: this.props.movies.data,
      storageMovies: null,
      // storageMovies: this.props.movies.data,
      // actionWithPage: "scroll",
      // url: "http://localhost:4000/movies",
      // url: this.props.url,
      // offset: 10,
      // offset: this.props.offset,
      currentCategory: "all",
      isViewCardMovie: false,
      currentFilm: null,
      // category: null,
    };
  }
  componentDidMount() {
    // store.dispatch(fetchData(0));
    const state = store.getState();
    // store.dispatch(fetchData(this.props.url, this.props.offset)).then(() => {
    //   this.setState((prev, props) => ({
    //     movies: state.fetchMovies.storageMovies,
    //     storageMovies: state.fetchMovies.storageMovies,
    //   }));
    // });
    store
      .dispatch(fetchData(state.url.url, state.url.offset, null))
      .then(() => {
        this.setState((prev, props) => ({
          movies: state.fetchMovies.storageMovies,
          storageMovies: state.fetchMovies.storageMovies,
        }));
      });
    window.addEventListener("scroll", this.scrollEventonWindow, false);
  }

  scrollEventonWindow = (e) => {
    if (
      e.target.scrollingElement.offsetHeight -
        e.target.scrollingElement.scrollTop <=
      1140
    ) {
      const state = store.getState();
      // if (state.url.category != null) {
      //   this.setState((prev, props) => ({
      //     // movies: state.fetchMovies.movies,
      //     movies: state.fetchMovies.moviesForCategory,
      //   }));
      // } else {
      //   this.setState((prev, props) => ({
      //     // movies: state.fetchMovies.movies,
      //     movies: state.fetchMovies.storageMovies,
      //   }));
      // }
      store.dispatch(
        changeUrl({
          url: store.getState().url.url,
          offset: store.getState().url.offset + 10,
        })
      );
      // this.setState((prev, props) => ({
      //   // movies: state.fetchMovies.movies,
      //   movies: state.fetchMovies.storageMovies,
      // }));
      store
        .dispatch(
          fetchData(
            store.getState().url.url,
            store.getState().url.offset,
            store.getState().fetchMovies.stateLoading.category
          )
        )
        .then((response) => {
          this.setState((prev, props) => ({
            movies: state.fetchMovies.storageMovies,
            // storageMovies: state.fetchMovies.movies,
          }));
        });
      // console.log(store.getState());
      // this.getServerSideProps();
    }
  };

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
    const state = store.getState();
    const category = e.target.textContent.toLocaleLowerCase();

    if (category === "all") {
      store.dispatch(
        changeUrl({
          url: "http://localhost:4000/movies?",
          offset: 0,
          category: null,
        })
      );
      store
        .dispatch(
          fetchData(
            store.getState().url.url,
            store.getState().url.offset,
            category
          )
        )
        .then((response) => {
          // debugger;
          this.setState((prev, props) => ({
            movies: response.movies,
            storageMovies: response.movies,
          }));
        });
    } else {
      store.dispatch(
        changeUrl({
          url:
            "http://localhost:4000/movies?search=" +
            category +
            "&searchBy=genres&",
          offset: 0,
          // category: category,
        })
      );
      store
        .dispatch(
          fetchData(
            store.getState().url.url,
            store.getState().url.offset,
            category
          )
        )
        .then((response) => {
          // debugger;
          this.setState((prev, props) => ({
            movies: response.movies,
            storageMovies: response.movies,
          }));
        });
    }

    // debugger;

    // let filterFilterOnCategory = this.state.storageMovies
    //   .map((item) => {
    //     item.genres = item.genres.map((it) => it.toLocaleLowerCase());
    //     return item;
    //   })
    //   .filter(
    //     (ii) =>
    //       ii.genres.indexOf(e.target.textContent.toLocaleLowerCase()) != -1
    //   );
    // if (e.target.textContent.toLocaleLowerCase() === "all")
    //   filterFilterOnCategory = this.state.storageMovies;
    // this.setState((state, props) => ({
    //   movies: filterFilterOnCategory,
    //   currentCategory: e.target.textContent,
    // }));
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
          // movies={!!this.state.movies ? this.state.movies : this.props.movies}
          movies={this.state.movies || this.props.movies}
          actionWithPage={this.state.actionWithPage}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  const { category, url, offset } = store.url;
  return {
    category: category,
    offset: offset,
    url: url,
  };
};

export default connect(mapStateToProps)(App);
