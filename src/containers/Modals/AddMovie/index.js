import React from 'react'
import HeaderTitle from '../../../components/Header/Title/index'

export default function AddMovie({isViewModalBox}) {
    return (
        (isViewModalBox ? 
        <section className={"modal__substrate"}>
            <section className={"modal__box"}>
                <HeaderTitle />
            </section>
            <form>
            <label for="title">TITLE</label>
            <input id="title" type="text" name="name"/>
            <label for="release">RELEASE DATE</label>
            <input id="release" type="text" name="name"/>
            <label for="movie">MOVIE URL</label>
            <input id="movie" type="text" name="name"/>
            <label for="genre">GENRE</label>
            <input id="genre" type="text" name="name"/>
            <label for="overview">OVERVIEW</label>
            <input id="overview" type="text" name="name"/>
            <label for="runtime">RUNTIME</label>
            <input id="runtime" type="text" name="name"/>
            </form>
             {/* <section className={"header_title"}>
                <HeaderTitle />
            </section> */}
        </section> 
        : <>{false}</>)
    )
}
