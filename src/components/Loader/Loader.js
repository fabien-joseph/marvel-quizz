import React, { Fragment } from "react";
import './Loader.css'

export const Loader = ({style, text}) => {
    return (
        <Fragment>
            <div className={"loader"}/>
            <p style={style}>
                {text}
            </p>
        </Fragment>
    )
};