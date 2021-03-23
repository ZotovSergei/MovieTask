import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Types from "../store/types";

const movies = (state = [], action) => {
  switch (action.type) {
    case Types.SET_MOVIES:
      return { movies: action.payload.movies };
    case Types.ADD_MOVIES:
      var map = action.payload.movies.data.map((item) => {
        const isSome = state.movies.data.some((el) => {
          return el.id == item.id;
        });
        if (!isSome) return item;
      });
      if (map.length != 0) state.movies.data = [...state.movies.data, ...map];
      return state;
    case Types.GET_MOVIES:
      debugger;
      return state;
    default:
      return state;
  }
};

const initFetchMoviesState = {
  stateLoading: {
    isLoading: true,
    isError: false,
    isValidate: true,
    category: null,
    // offset: 0,
  },
  movies: [],
  storageMovies: [],
  moviesForCategory: [],
};
const fetchMovies = (state = initFetchMoviesState, action) => {
  switch (action.type) {
    case Types.REQUEST_POSTS:
      return state;
    case Types.RECEIVE_POSTS:
      state.storageMovies = state.storageMovies.concat(action.movies);
      state.moviesForCategory = state.storageMovies.concat(action.movies);
      if (state.stateLoading.category != action.stateLoading.category) {
        state.storageMovies = action.movies;
      }
      debugger;
      // let map = action.movies.map((item) => {
      //   const isSome = state.movies.some((el) => {
      //     return el.id == item.id;
      //   });
      //   if (!isSome) return item;
      // });
      // if (map.length != 0) state.movies = [...state.movies, ...map];
      // debugger;
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
// const getMovies = (state = [], action) => {
//   switch (action.type) {
//     case Types.GET_MOVIES:
//       return { ...state.movies };
//     default:
//       return state;
//   }
// };

const changeUrlStateInit = {
  url: "http://localhost:4000/movies?",
  offset: 0,
  category: null,
};
const changeUrl = (state = changeUrlStateInit, action) => {
  switch (action.type) {
    case Types.CHANGE_CURRENT_URL:
      // debugger;
      return !!action ? Object.assign({}, action) : state;
    // return Object.assign({}, state, action);
    default:
      return state;
  }
};

// const addMovies = (state = {}, action) => {
//   switch (action.type) {
//     case Types.ADD_MOVIES:
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  // movies: movies,
  fetchMovies,
  url: changeUrl,
});
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;
