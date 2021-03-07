import React from "react";
import HeaderTitle from "../../../components/Header/Title/index";
import AddMovieButton from "../../Modals/AddMovie/Button/index";
import Cross from "../../../components/Buttons/Cross/index";

export default function ModalBoxAddMovie({
  isViewModalBox,
  handlerClickAddMovie,
  titleModalBox,
  flagModalBox,
  category,
  currentFilm
}) {

   const onSubmit = async (e) => {
    e.preventDefault(); 
    console.log('text');
    let url = 'http://localhost:4000/movies';
    let method = 'POST'
    if (flagModalBox === 'edit') {
      method = "PUT"
    }
    let config = {
      "title": e.target[0].value,
      "tagline": "Here's to the fools who dream.",
      "vote_average": 7.9,
      "vote_count": 6782,
      "release_date": e.target[1].value,
      "poster_path": "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
      "overview": e.target[4].value,
      "budget": 30000000,
      "revenue": 445435700,
      "runtime": e.target[5].value,
      "genres": e.target[3].value
    }
    debugger
    const response = await fetch(url,{
      method: method,
      body: JSON.stringify(config)
    })
    console.log(response)
    return response.json()
  }

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
          <form className={"form"} onSubmit={onSubmit}>
            <h3>{titleModalBox}</h3>
            {flagModalBox === "edit" ? (
              <>
                <label htmlFor="movie-id">MOVIE ID</label>
                <input id="movie-id" type="text" name="name" defaultValue={currentFilm.id } readOnly/>
                <label htmlFor="title">TITLE</label>
                <input id="title" type="text" name="name"  defaultValue={currentFilm.title }/>
                <label htmlFor="release">RELEASE DATE</label>
                <input id="release" type="date" name="name" defaultValue={currentFilm.release_date }/>
                <label htmlFor="movie">MOVIE URL</label>
                <input id="movie" type="text" name="name"/>
              </>
            ) : (
              <>
              <label htmlFor="title">TITLE</label>
              <input id="title" type="text" name="name"/>
              <label htmlFor="release">RELEASE DATE</label>
              <input id="release" type="date" name="name"/>
              <label htmlFor="movie">MOVIE URL</label>
              <input id="movie" type="text" name="name"/>
              </>
            )}
           
            {flagModalBox === "add" ? (
              <>
                <label htmlFor="genre">GENRE</label>
                <select>
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
                <input id="genre" type="text" name="name"/*  value={"" || currentFilm.genres } *//>
                <label htmlFor="overview">OVERVIEW</label>
                <input id="overview" type="text" name="name" defaultValue={"" || currentFilm.overview }/>
                <label htmlFor="runtime">RUNTIME</label>
                <input id="runtime" type="text" name="name" defaultValue={"" || currentFilm.runtime }/>
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
