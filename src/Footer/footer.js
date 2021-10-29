import React from 'react'
import './footer.css'
import logo from '../python-256.png'

export default function Footer() {
    return (
        <>
        <div className={"footer"}>
            <div className={"footer-logo"}>
                <img src={logo}></img>
            </div>
            <ul>
                <li><a href="./">Home</a></li>
                <li><a href="./contact">Contact</a></li>
                <li><a href="./portfolio">Todo</a></li>
            </ul>

            <div className={"copyright-text"}>
                <p>Gabriel Raskov ©2021. Kattegattsgymnasiet</p>
            </div>

        </div>
        </>
    )
}