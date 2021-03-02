import React from "react";
import HeaderTitle from "../../../components/Header/Title/index";
import AddMovieButton from "../../Modals/AddMovie/Button/index";

export default function AddMovie({ isViewModalBox, handlerClickAddMovie }) {
  return isViewModalBox ? (
    <section className={"modal__substrate"}>
      <section className={"modal__box"}>
        <HeaderTitle />
      </section>
      <section className={"add_movie_form"}>
        <div className={"accross"} onClick={handlerClickAddMovie}></div>
        <form className={"form"}>
          <h3>ADD MOVIE</h3>
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
              textOnTheButton={"SUBMIT"}
              classNameButton={"modal-button submit_button"}
              typeElements={"button"}
            />
            {/* <input type="button" value="RESET" />
            <input className={"button_addmovie"} type="button" value="SUBMIT" /> */}
          </div>
        </form>
      </section>
      {/* <section className={"header_title"}>
                <HeaderTitle />
            </section> */}
    </section>
  ) : (
    <>{false}</>
  );
}
