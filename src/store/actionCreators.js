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

const addMovies = (goal) => ({
  type: Types.ADD_MOVIES,
  payload: {
    movies: goal,
  },
});

const requestPosts = (goal) => {
  return {
    type: Types.REQUEST_POSTS,
    goal,
  };
};

const receivePosts = (subreddit, json) => {
  return {
    type: Types.RECEIVE_POSTS,
    stateLoading: subreddit,
    movies: json.data,
    receivedAt: Date.now(),
  };
};

const fetchData = (offset) => (dispatch) => {
  dispatch(
    requestPosts({
      isLoading: true,
      isError: false,
      isValidate: true,
      offset: 0,
    })
  );
  return fetch("http://localhost:4000/movies" + "?offset=" + offset)
    .then((response) => response.json())
    .then((json) =>
      dispatch(
        receivePosts(
          {
            isLoading: false,
            isError: false,
            isValidate: true,
            offset: offset + 10,
          },
          json
        )
      )
    );
};

export { setMovies };
export { getMovies };
export { addMovies };
export { requestPosts };
export { receivePosts };
export { fetchData };
