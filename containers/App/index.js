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
import {BrowserRouter as Router,Switch,NavLink,Route} from 'react-router-dom'

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
      orderBy: "release_date",
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
    debugger
    store
      .dispatch(fetchData(state.url.url+state.url.sortOrder+state.url.sortBy, state.url.offset, null))
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
      // const state = store.getState();
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
          sortOrder: store.getState().url.sortOrder,
          sortBy: store.getState().url.sortBy,
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
            store.getState().url.url + store.getState().url.sortOrder + store.getState().url.sortBy,
            store.getState().url.offset+10,
            store.getState().fetchMovies.stateLoading.category
          )
        )
        .then((response) => {
          // const st = store.getState();
          this.setState((prev, props) => ({
            movies: store.getState().fetchMovies.storageMovies,
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
          sortOrder: store.getState().url.sortOrder,
          sortBy: store.getState().url.sortBy,
          offset: 0,
          category: null,
        })
      );
      store
        .dispatch(
          fetchData(
            store.getState().url.url + store.getState().url.sortOrder + store.getState().url.sortBy,
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
            "http://localhost:4000/movies?filter=" +
            category + "&",
          sortOrder: store.getState().url.sortOrder,
          sortBy: store.getState().url.sortBy,  
          offset: 0,
          // category: category,
        })
      );
      store
        .dispatch(
          fetchData(
            store.getState().url.url+store.getState().url.sortOrder+store.getState().url.sortBy,
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
  };

  handlerClickOnBackSearchButton = (e) => {
    this.setState({ isViewCardMovie: !this.state.isViewCardMovie });
  };

  handlerClickCardWithMovie = (e, currentFilm) => {
    this.setState({ isViewCardMovie: true, currentFilm: currentFilm });
  };

  handlerClickSearch = (e, searchStr) => {
    if (searchStr === "" || searchStr == null) {
      return;
    }
    store.dispatch(
      changeUrl({
        url:
          "http://localhost:4000/movies?search=" +
          searchStr +
          "&searchBy=title&",
        offset: 0,
        category: searchStr,
      })
    );
    store
      .dispatch(
        fetchData(
          store.getState().url.url,
          store.getState().url.offset,
          searchStr
        )
      )
      .then((response) => {
        // debugger;
        this.setState((prev, props) => ({
          movies: response.movies,
          storageMovies: response.movies,
        }));
      });
    // this.getStaticProps(searchStr);
  };

  handlerSortClick = (e) => {
    if (e.target.textContent === "SORT BY") {
      const st = store.getState();
      const thisState = this.state;
      console.log(store.getState().url.url)
      store.dispatch(
        changeUrl({
          url: store.getState().url.url,
          sortOrder: store.getState().url.sortOrder,
          sortBy: store.getState().url.sortBy,
          offset: 0,
          category:  this.state.orderBy,
        })
      );

      store
        .dispatch(
          fetchData(
            store.getState().url.url + store.getState().url.sortOrder + store.getState().url.sortBy,
            store.getState().url.offset,
            this.state.orderBy,
          )
        )
        .then((response) => {
          this.setState((prev, props) => ({
            movies: response.movies,
            storageMovies: response.movies,
          }));
        });
    } else {
    }
  };

  handlerSortChangeItem = (e) => {
      let orderBy = "release_date";
      debugger
      switch (e.target.value.toLocaleLowerCase()) {
        case "rating":
          store.dispatch(
            changeUrl({
              url: store.getState().url.url,
              sortOrder: "sortOrder=desc&",
              sortBy: "sortBy=vote_average&",
              offset: 0,
              category: "vote_average",
            })
          );
          orderBy = "vote_average";
          break;
        case "genre":
          orderBy= "genres";
          break;
        case "release date":
          store.dispatch(
            changeUrl({
              url: store.getState().url.url,
              sortOrder: "sortOrder=desc&",
              sortBy: "sortBy=release_date&",
              offset: 0,
              category: "release_date",
            })
          );
          orderBy = "release_date";
        break;
        default:
          break;
      }
      this.setState((prev, props) => ({
        orderBy: orderBy
      }));
  }

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
          handlerSortClick={this.handlerSortClick}
          handlerClickEditMenuItems={this.handlerClickCallModalBox}
          handlerClickCardWithMovie={this.handlerClickCardWithMovie}
          handlerSortChangeItem={this.handlerSortChangeItem}
          // movies={!!this.state.movies ? this.state.movies : this.props.movies}
          movies={this.state.movies || this.props.movies}
          actionWithPage={this.state.actionWithPage}
        />
        <Footer />
      </>
    )
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
