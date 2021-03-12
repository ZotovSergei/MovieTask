import Types from "../store/types";
const setMovies = (goal) => ({
  type: Types.SET_MOVIES,
  payload: {
    movies: goal,
  },
});

const getMovies = (goal) => ({
  type: Types.GET_MOVIES,
  payload: {
    movies: goal,
  },
});

export { setMovies };
export { getMovies };
