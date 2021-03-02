import React from 'react'

export default function Dots({isViewDots, handlerClick}) {
    return isViewDots ? (
        <div className={"dots"} onClick={handlerClick}>
            ...
        </div>
    ):(<>{false}</>)
}
