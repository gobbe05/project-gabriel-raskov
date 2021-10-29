import React from 'react'
import './CSS/home.css'
import Content from './home-content'
import Aboutme from './about-me'
import Contact from './Contact/contact'

function Home() {
return (
        <>
        <div id="page-content">
            <div className="start-content">
            <Content />
            </div>
            <div className={"about-me-content"}>
            <Aboutme />
            <Contact />
            </div>
        </div>
        </>
    )
    
}

export default Home