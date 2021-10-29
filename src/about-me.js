import React from 'react'
import './CSS/about-me.css'
import logo from './IMG_0455.jpg'
import python from './python-256.png'
import css from './css.png'

export default function Aboutme () {
    return (
        <>
        <div id={"about-me-container"}>
            
                <div className={"item"}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"></img>
                    <h1>React</h1>
                </div>

                <div className={"item"}>
                    <img src={css}></img>
                    <h1>CSS</h1>
                </div>

                <div className={"item"}>
                    <img src={python}></img>
                    <h1>Python</h1>
                </div>
            </div>
        </>
    )
}