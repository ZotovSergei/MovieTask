import React,{useState} from "react";
import HeaderTitle from "../../../components/Header/Title/index";
import AddMovieButton from "../../Modals/AddMovie/Button/index";
import Cross from "../../../components/Buttons/Cross/index";
import store from "../../../src/store/index";
import {
  editRequestMovies,
  asyncRequestDeleteMovie,
} from "../../../src/store/actionCreators";

export default function ModalBoxAddMovie({
  isViewModalBox,
  handlerClickAddMovie,
  titleModalBox,
  flagModalBox,
  category,
  currentFilm,
}) {

  const changeSelectGenres = (e) => {
    let select = [];
    select.push(e.target.value)
    setGenres(select)
  }
  const [genres,setGenres] = useState([]);
  const onSubmit = async (e) => {
    debugger;
    e.preventDefault();
    let url = "http://localhost:4000/movies";
    let method = "POST";
    let title = e.target[0].value;
    let release_date = e.target[1].value;
    let runtime = e.target[5].value;
    if (flagModalBox === "edit") {
      method = "PUT";
      title = e.target[1].value;
      release_date = e.target[2].value;
      runtime = e.target[6].value;
    }
    let body = {
      // id: currentFilm.id,
      title: title,
      // tagline: currentFilm.tagline,
      // vote_average: currentFilm.vote_average,
      // vote_count: currentFilm.vote_count,
      release_date: release_date,
      poster_path: !!currentFilm ? currentFilm.poster_path : e.target[2].value,
      overview: !!currentFilm ? currentFilm.overview : e.target[4].value,
      // budget: currentFilm.budget,
      // revenue: currentFilm.revenue,
      runtime: +runtime,
      // genres: e.target[4].value.split(","),
      genres: genres,
    };
    if (flagModalBox === "edit") {
      body.id = currentFilm.id;
      body.tagline = currentFilm.tagline;
      body.vote_average = currentFilm.vote_average;
      body.vote_count = currentFilm.vote_count;
      // body.poster_path = currentFilm.poster_path;
      body.overview = currentFilm.overview;
      body.budget = currentFilm.budget;
      body.revenue = currentFilm.revenue;
    }
    let config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    store.dispatch(editRequestMovies(url, config));
    // const response = await fetch(url, {
    //   method: method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/json",
    //   },
    //   body: JSON.stringify(config),
    // });
    // console.log(response);
    // return response.json();
  };

  const onSubmitDeleteMovie = async (e) => {
    e.preventDefault();
    let url = "http://localhost:4000/movies";
    let method = "DELETE";
    let body = {
      id: currentFilm.id,
    };
    let config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    store.dispatch(asyncRequestDeleteMovie(url, config));
  };

  const categoryFilter = category.map((item, index) => {
    if (item !== "ALL")
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
  });
  return isViewModalBox ? (
    <section className={"modal__substrate"}>
      <section className={"modal__box"}>
        <HeaderTitle />
      </section>
      <section className={"add_movie_form"}>
        <Cross handlerClickAddMovie={handlerClickAddMovie} />
        {flagModalBox !== "delete" ? (
          <form className={"form"} onSubmit={(e) => onSubmit(e, currentFilm)}>
            <h3>{titleModalBox}</h3>
            {flagModalBox === "edit" ? (
              <>
                <label htmlFor="movie-id">MOVIE ID</label>
                <input
                  id="movie-id"
                  type="text"
                  name="name"
                  defaultValue={currentFilm.id}
                  readOnly
                />
                <label htmlFor="title">TITLE</label>
                <input
                  id="title"
                  type="text"
                  name="name"
                  defaultValue={currentFilm.title}
                  required
                />
                <label htmlFor="release">RELEASE DATE</label>
                <input
                  id="release"
                  type="date"
                  name="name"
                  defaultValue={currentFilm.release_date}
                />
                <label htmlFor="movie">MOVIE URL</label>
                <input id="movie" type="text" name="name" />
              </>
            ) : (
              <>
                <label htmlFor="title">TITLE</label>
                <input id="title" type="text" name="name" />
                <label htmlFor="release">RELEASE DATE</label>
                <input id="release" type="date" name="name" />
                <label htmlFor="movie">MOVIE URL</label>
                <input id="movie" type="text" name="name" />
              </>
            )}

            {flagModalBox === "add" ? (
              <>
                <label htmlFor="genre">GENRE</label>
                <select onChange={changeSelectGenres}>
                  multiple={true} value={categoryFilter}
                </select>

                {/* <select>
                  <option value="grapefruit">Грейпфрут</option>
                  <option value="lime">Лайм</option>
                  <option selected value="coconut">
                    Кокос
                  </option>
                  <option value="mango">Манго</option>
                </select> */}
                <label htmlFor="overview">OVERVIEW</label>
                <input id="overview" type="text" name="name" />
                <label htmlFor="runtime">RUNTIME</label>
                <input id="runtime" type="text" name="name" />
              </>
            ) : (
              <>
                <label htmlFor="genre">GENRE</label>
                <input
                  id="genre"
                  type="text"
                  name="name" /*  value={"" || currentFilm.genres } */
                  required
                />
                <label htmlFor="overview">OVERVIEW</label>
                <input
                  id="overview"
                  type="text"
                  name="name"
                  defaultValue={"" || currentFilm.overview}
                />
                <label htmlFor="runtime">RUNTIME</label>
                <input
                  id="runtime"
                  type="text"
                  name="name"
                  defaultValue={"" || currentFilm.runtime}
                  required
                />
              </>
            )}

            <div className={"wrapper_modal_button"}>
              <AddMovieButton
                textOnTheButton={"RESET"}
                classNameButton={"modal-button reset_button"}
                typeElements={"button"}
              />
              <AddMovieButton
                textOnTheButton={flagModalBox === "edit" ? "SAVE" : "SUBMIT"}
                classNameButton={"modal-button submit_button"}
                typeElements={"submit"}
              />
              {/* <input type="button" value="RESET" />
            <input className={"button_addmovie"} type="button" value="SUBMIT" /> */}
            </div>
          </form>
        ) : (
          <form
            className={"form"}
            onSubmit={(e) => onSubmitDeleteMovie(e, currentFilm)}
          >
            <h3>{titleModalBox}</h3>
            <label>Are you sure you want to delete this movie?</label>
            <div className={"wrapper_modal_button"}>
              <AddMovieButton
                textOnTheButton={"CONFIRM"}
                classNameButton={"modal-button submit_button"}
                typeElements={"submit"}
              />
            </div>
          </form>
        )}
      </section>
    </section>
  ) : (
    <>{false}</>
  );
}
