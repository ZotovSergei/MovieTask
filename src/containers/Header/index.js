import React, {useState} from "react";
import AddMovie from "../../components/Header/AddMovie";
import HeaderTitle from "../../components/Header/Title/index";
import FinderTitle from "../../components/Finder/Title/index";
import InputSearch from "../../components/Finder/InputSearch";
import ButtonSearch from "../../components/Finder/ButtonSearch";
import ModalBoxAddMovie from '../Modals/AddMovie/index'

export default function Header() {

  
  const [isModalBoxAddMovie, setIsModalBoxAddMovie] = useState(false);

  const handlerClickAddMovie = () => {
    setIsModalBoxAddMovie(!isModalBoxAddMovie)
  }

  return (
    <header className={"header"}>
      <section className={"header_title"}>
        <HeaderTitle />
        <AddMovie handlerClickAddMovie={handlerClickAddMovie}/>
        <ModalBoxAddMovie isViewModalBox={isModalBoxAddMovie}/>
      </section>
      <section className={"header_finder"}>
        <FinderTitle />
        <section className={"search_movie"}>
          <InputSearch />
          <ButtonSearch />
        </section>
      </section>
    </header>
  );
}
