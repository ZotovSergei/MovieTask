import React from "react";
import HeaderTitle from "../../../components/Header/Title/index";
import AddMovieButton from "../../Modals/AddMovie/Button/index";
import Cross from "../../../components/Buttons/Cross/index";

export default function AddMovie({
  isViewModalBox,
  handlerClickAddMovie,
  titleModalBox,
  flagModalBox,
}) {
  return isViewModalBox ? (
    <section className={"modal__substrate"}>
      <section className={"modal__box"}>
        <HeaderTitle />
      </section>
      <section className={"add_movie_form"}>
        <Cross handlerClickAddMovie={handlerClickAddMovie} />
        {flagModalBox !== "delete" ? (
          <form className={"form"}>
            <h3>{titleModalBox}</h3>
            {flagModalBox === "edit" ? (
              <>
                <label htmlFor="movie-id">MOVIE ID</label>
                <input id="movie-id" type="text" name="name" />
              </>
            ) : (
              false
            )}
            <label htmlFor="title">TITLE</label>
            <input id="title" type="text" name="name" />
            <label htmlFor="release">RELEASE DATE</label>
            <input id="release" type="text" name="name" />
            <label htmlFor="movie">MOVIE URL</label>
            <input id="movie" type="text" name="name" />
            <label htmlFor="genre">GENRE</label>
            <input id="genre" type="text" name="name" />
            <label htmlFor="overview">OVERVIEW</label>
            <input id="overview" type="text" name="name" />
            <label htmlFor="runtime">RUNTIME</label>
            <input id="runtime" type="text" name="name" />
            <div className={"wrapper_modal_button"}>
              <AddMovieButton
                textOnTheButton={"RESET"}
                classNameButton={"modal-button reset_button"}
                typeElements={"button"}
              />
              <AddMovieButton
                textOnTheButton={flagModalBox === "edit" ? "SAVE" : "SUBMIT"}
                classNameButton={"modal-button submit_button"}
                typeElements={"button"}
              />
              {/* <input type="button" value="RESET" />
            <input className={"button_addmovie"} type="button" value="SUBMIT" /> */}
            </div>
          </form>
        ) : (
          <form className={"form"}>
            <h3>{titleModalBox}</h3>
            <label>Are you sure you want to delete this movie?</label>
            <div className={"wrapper_modal_button"}>
              <AddMovieButton
                textOnTheButton={"CONFIRM"}
                classNameButton={"modal-button submit_button"}
                typeElements={"button"}
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
