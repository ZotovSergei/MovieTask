import { combineReducers } from "redux";
import { createStore } from "redux";
import Types from "../store/types";

const setMovies = (state = [], action) => {
  switch (action.type) {
    case Types.SET_MOVIES:
      return { movies: action.payload.movies };
    default:
      return state;
  }
};

const getMovies = (state = [], action) => {
  switch (action.type) {
    case Types.GET_MOVIES:
      return { ...state.movies };
    default:
      return state;
  }
};

const addMovies = (state = [], action) => {
  switch (action.type) {
    case Types.ADD_MOVIES:
      debugger;
      return action.payload.movies;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  setMovies,
  getMovies,
});
const store = createStore(rootReducer);
export default store;
