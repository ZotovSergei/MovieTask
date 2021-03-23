import Types from "../store/types";

const changeUrl = (goal) => {
  return {
    type: Types.CHANGE_CURRENT_URL,
    url: goal.url,
    offset: goal.offset,
    category: goal.category,
  };
};
// const setMovies = (goal) => ({
//   type: Types.SET_MOVIES,
//   payload: {
//     movies: goal,
//   },
// });

// const getMovies = (goal) => ({
//   type: Types.GET_MOVIES,
//   payload: {
//     movies: goal,
//   },
// });

// const addMovies = (goal) => ({
//   type: Types.ADD_MOVIES,
//   payload: {
//     movies: goal,
//   },
// });

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

const fetchData = (url, offset, category) => (dispatch) => {
  dispatch(
    requestPosts({
      isLoading: true,
      isError: false,
      isValidate: true,
      category: category,
      // offset: 0,
    })
  );
  // "http://localhost:4000/movies?search=COMEDY&searchBy=genres&offset=10"
  return fetch(url + "offset=" + offset)
    .then((response) => response.json())
    .then((json) =>
      dispatch(
        receivePosts(
          {
            isLoading: false,
            isError: false,
            isValidate: true,
            category: category,
            // offset: offset + 10,
          },
          json
        )
      )
    );
  // .then(() => dispatch(changeUrl({ url: url, offset: offset + 10 })));
};

// export { setMovies };
// export { getMovies };
export { changeUrl };
export { requestPosts };
export { receivePosts };
export { fetchData };
