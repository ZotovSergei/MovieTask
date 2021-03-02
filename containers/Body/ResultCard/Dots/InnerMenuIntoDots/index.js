import React from 'react'
import Cross from '../../../../../components/Buttons/Cross'

export default function InnerMenuIntoDots({isViewInnerMenu}) {
    return isViewInnerMenu ? (
        <div className={"inner_menu_dots"}>
            <ul className={"edit_menu"}>
                <li>EDIT</li>
                <li>DELETE</li>
            </ul>
            <Cross/>
        </div>
    ) : (
        <>{false}</>
    )
}
