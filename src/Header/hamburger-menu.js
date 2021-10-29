import React from 'react'
import './hamburger.css'

export default function HamburgerMenu(props) {
    const [activateHamburger, setActivateHamburger] = React.useState(false)

    return (
        <>
        <div id="hamburger" onClick={() => {
            if(activateHamburger) setActivateHamburger(false)
            else setActivateHamburger(true)
        }}>
            <div className={"bar"}></div>
            <div className={"bar"}></div>
            <div className={"bar"}></div>
        </div>

        <div className={"side-menu" + (activateHamburger ? " display" : "")}>
            <h1 className={"close"} onClick={() => {
                setActivateHamburger(false)
            }}>X</h1>

            <ul>
                <li><a href="./">Home</a></li>
                <li><a href="./portfolio">Portfolio</a></li>
                <li><a href="./login">Login</a></li>
            </ul>
        </div>
        </>
    )
}